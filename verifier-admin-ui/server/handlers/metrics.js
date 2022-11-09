/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const logger = require('../config/logger').getLogger('user-handler');
const axios = require('../helpers/axiosClient');

exports.queryMeteringAPI = async (request, response) => {
	try {
		const client = axios.getMeteringClient(request);
		const apiResponse = await client.post('/metrics/verifier/query', request.body)

		return response.status(apiResponse.status).send(apiResponse.data);
	} catch (error) {
		return response.status(error.response.status).send(error.response.statusText);
	}
}


