/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const logger = require('../config/logger').getLogger('verification-handler');
const axios = require('../helpers/axiosClient');

exports.getVerifier = async (request, response) => {
    logger.info(`getVerifier`);

    try {
        const client = axios.getVerifierClient(request);
        const { custid, orgid, verifierid } = request.params;
        const apiResponse = await client.get(`/admin/customer/${custid}/org/${orgid}/verifier/${verifierid}/credential?type=json`);
        response.headers = apiResponse.headers;
        return response.status(apiResponse.status).send(apiResponse.data);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};

exports.getVerifiers = async (request, response) => {
    logger.info(`getVerifiers`);
    
    try {
        const client = axios.getVerifierClient(request);
        const { custid, orgid } = request.params;
        const apiResponse = await client.get(`/admin/customer/${custid}/org/${orgid}/verifier`);
        const { data } = apiResponse.data.verifiers
        const dataWithId = data.map((row) => { return { ...row, id: row.verifierId } })

        return response.status(apiResponse.status).send(dataWithId);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};

exports.deleteVerifier = async (request, response) => {
    logger.info(`deleteVerifier`);
    
    try {
        const client = axios.getVerifierClient(request);
        const { custid, orgid, verifierid } = request.params;
        const apiResponse = await client.post(`/admin/customer/${custid}/org/${orgid}/verifier/${verifierid}/revoke`);
        const { data } = apiResponse

        return response.status(apiResponse.status).send(data);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};

exports.addVerifier = async (request, response) => {
    logger.info(`addVerifier`);

    try {
        const client = axios.getVerifierClient(request);
        const { custid, orgid } = request.params;
        const postData = request.body;

        if (request.body.daysTillExpiry) {
            postData.daysTillExpiry = parseInt(request.body.daysTillExpiry);
        }

        const apiResponse = await client.post(`/admin/customer/${custid}/org/${orgid}/verifier`, postData);
        const { data } = apiResponse

        return response.status(apiResponse.status).send(data);
    } catch (error) {
        return response.status(error.response.status).send(error.response.statusText);
    }
};