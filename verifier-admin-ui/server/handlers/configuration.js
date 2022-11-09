/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const logger = require('../config/logger').getLogger('configuration-handler');
const axios = require('../helpers/axiosClient');

const CONFIG_ROOT = '/api/v1/verifier-configurations';
const VALUE_SETS_ROOT = '/api/v1/value-sets';
const PROFILE_ROOT = '/profile';

const getProfile = async (client, customerId) => {
  logger.info(`getProfile`);

  try {
    const URL =
      customerId === 'MASTER'
        ? `${PROFILE_ROOT}/master`
        : `${PROFILE_ROOT}/${customerId}`;

    const apiResponse = await client.get(URL);

    if (apiResponse.status === 200) {
      if (
        apiResponse?.data?.result?.verifierConfigurations[0]?.configId === null
      ) {
        return { verifierConfigurations: [] };
      } else return apiResponse?.data?.result;
    }
  } catch (error) {
    if (error.response.status === 404) {
      return { verifierConfigurations: [] };
    }
  }
};

exports.getConfigs = async (request, response) => {
  logger.info(`getConfigs`);

  try {
    const client = axios.getConfigClient(request);
    const { customerId, versions, master_catalog } = request.query;

    if (master_catalog === 'true') {
      const masterConfigurationResponse = await client.get(
        `${CONFIG_ROOT}?master_catalog=true`
      );
      return response
        .status(200)
        .send(masterConfigurationResponse?.data?.payload);
    } else if (customerId) {
      // STEP 1: get the old configurations
      const LEGANCY_CONFIG_URL =
        versions === 'all'
          ? `${CONFIG_ROOT}?customer_id=${customerId}`
          : `${CONFIG_ROOT}?customer_id=${customerId}&version=latest`;
      const legancyResponse = await client.get(LEGANCY_CONFIG_URL);

      const responsePayload = []; // response

      if (legancyResponse?.status === 200) {
        responsePayload.push(...legancyResponse?.data?.payload);
      }

      // STEP 2: get the customer profile so we have access to the configIds and version we need to explicitly fetch
      const profileClient = axios.getVerifierClient(request);
      const profile = await getProfile(profileClient, customerId);

      // STEP 3: iterate over the verifierConfigurations and fetch each verifier-configuration
      const newConfigurations = await Promise.all(
        profile?.verifierConfigurations.map(async ({ configId, version }) => {
          try {
            const configurationResponse = await client.get(
              `${CONFIG_ROOT}/${configId}/${version}`
            );

            if (configurationResponse.status === 200) {
              return configurationResponse?.data?.payload || {};
            }
            return {};
          } catch (error) {
            error.response.status;
          }
        })
      );

      // STEP 4: consolidate the response from STEP1 and STEP 3 into the response payload
      responsePayload.push(...newConfigurations);

      return response.status(200).send(responsePayload);
    } else {
      return response
        .status(404)
        .send({ message: 'customerId is required but was missing' });
    }
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};

exports.getConfig = async (request, response) => {
  logger.info(`getConfig`);

  try {
    const client = axios.getConfigClient(request);
    const { id, version } = request.params;

    const responsePayload = {};

    const URL = `${CONFIG_ROOT}/${id}/${version}/content`;
    const expandedResponse = await client.get(URL);

    if (expandedResponse.status === 200) {
      responsePayload.expanded = expandedResponse?.data?.payload || {};

      if (expandedResponse.data.payload.specificationConfigurations) {
        const URL = `${CONFIG_ROOT}/${id}/${version}`;
        const referenceResponse = await client.get(URL);

        if (referenceResponse.status === 200) {
          responsePayload.reference = referenceResponse?.data?.payload || {};
        }
      }
    }

    return response.status(200).send(responsePayload);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};

exports.deleteConfig = async (request, response) => {
  logger.info(`deleteConfig`);

  try {
    const client = axios.getConfigClient(request);
    const { id, version } = request.params;

    const URL = `${CONFIG_ROOT}/${id}/${version}`;

    const apiResponse = await client.delete(URL);
    response.headers = apiResponse.headers;
    return response.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};

exports.createConfig = async (request, response) => {
  logger.info(`createConfig`);

  try {
    const client = axios.getConfigClient(request);

    const URL = request.body.id
      ? `${CONFIG_ROOT}/${request.body.id}`
      : CONFIG_ROOT;

    const apiResponse = await client.post(URL, request.body);
    const responsePayload = apiResponse.data.payload;
    return response.status(apiResponse.status).send(responsePayload);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.data.message);
  }
};

exports.createValueSet = async (request, response) => {
  logger.info(`createValueSet`);

  try {
    const client = axios.getConfigClient(request);

    const URL = VALUE_SETS_ROOT;

    const apiResponse = await client.post(URL, request.body);
    const responsePayload = apiResponse.data.payload;
    return response.status(apiResponse.status).send(responsePayload);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.data.message);
  }
};
