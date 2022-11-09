/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const logger = require('../config/logger').getLogger('profile-handler');
const axios = require('../helpers/axiosClient');

const PROFILE_ROOT = '/profile'

exports.createProfile = async (request, response, next) => {
	logger.info(`createProfile`);

	try {
		const client = axios.getVerifierClient(request);
		const { id } = request.params;
		
		await client.post(`${PROFILE_ROOT}/${id}`, request.body);
		next();
	} catch (error) {
		if (error.response.status === 409) {
			next();
		} else {
			return response.status(error.response.status).send(error.response.statusText);
		}
	}
}

exports.getProfile = async (request, response) => {
	logger.info(`getProfile`);

	try {
		const client = axios.getVerifierClient(request);
		const { id } = request.params;

		const apiResponse = await client.get(`${PROFILE_ROOT}/${id}`);
		const payload = apiResponse.data.payload;
		return response.status(apiResponse.status).send(payload);
	} catch (error) {
		return response.status(error.response.status).send(error.response.statusText);
	}
}

exports.addConfigToProfile = async (request, response) => {
	logger.info(`addConfigToProfile`);

	try {
		const client = axios.getVerifierClient(request);
		const { id } = request.params;

		const apiResponse = await client.patch(`${PROFILE_ROOT}/${id}/addconfig`, request.body);
		const payload = apiResponse.data.result;
		return response.status(apiResponse.status).send(payload);
	} catch (error) {
		return response.status(error.response.status).send(error.response.statusText);
	}
}

exports.deleteConfigFromProfile = async (request, response, next) => {
	logger.info(`deleteConfigFromProfile`);

	try {
		const client = axios.getVerifierClient(request);
		const { cID: profileId } = request.query;
		const { id: configId, version } = request.params;

		const body = {
			profileId,
			configId,
			version
		}

		await client.patch(`${PROFILE_ROOT}/${id}/deleteconfig`, body);
		next();
	} catch (error) {
		next();
	}
}

exports.deleteProfile = async (request, response, next) => {
	logger.info(`deleteProfile`);

	try {
		const client = axios.getVerifierClient(request);
		const { id } = request.params;

		const apiResponse = await client.delete(`${PROFILE_ROOT}/${id}`);
		const payload = apiResponse.data.payload;
		return response.status(apiResponse.status).send(payload);
	} catch (error) {
		return response.status(error.response.status).send(error.response.statusText);
	}
}
