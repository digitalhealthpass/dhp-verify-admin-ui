/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const logger = require('../config/logger').getLogger('organization-handler');
const axios = require('../helpers/axiosClient');

exports.getOrganizations = async (request, response) => {
    logger.info(`getOrganization`);
    
    try {
        const client = axios.getVerifierClient(request);
        const { custid } = request.params;
        const apiResponse = await client.get(`/admin/customer/${custid}/org`);
        const { data } = apiResponse.data.orgs
        const dataWithId = data.map((row) => { return { ...row, id: row.orgId } })

        return response.status(apiResponse.status).send(dataWithId);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};

exports.deleteOrganization = async (request, response) => {
    logger.info(`deleteOrganization`);
    
    try {
        const client = axios.getVerifierClient(request);
        const { custid, orgid } = request.params;

        const apiResponse = await client.delete(`/admin/customer/${custid}/org/${orgid}`);
        const { data } = apiResponse

        return response.status(apiResponse.status).send(data);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};

exports.addOrganization = async (request, response) => {
    logger.info(`addOrganization`);

    try {
        const client = axios.getVerifierClient(request);
        const { custid } = request.params;
        const postData = request.body;

        const apiResponse = await client.post(`/admin/customer/${custid}/org/`, postData);
        const { data } = apiResponse

        return response.status(apiResponse.status).send(data);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};