/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const axios = require('axios');
const logger = require('../config/logger').getLogger('axios');
const tlsHelper = require('../utils/tls-helper');
const { REQUEST_HEADERS } = require('../constants/network.js');
const nJwt = require('njwt');

function getVerifierClient(request) {
	const token = request.cookies ? request.cookies.accessTokenGH : '';

	const txnid = request.headers[REQUEST_HEADERS.TRANSACTION_ID];

	!token && logger.info(`unauthenticated request`);

	const axiosInstance = axios.create({
		baseURL: process.env.VERIFIER_API_URL,
		httpsAgent: tlsHelper.getAgentHeaderForSelfSignedCerts(),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
			[REQUEST_HEADERS.TRANSACTION_ID]: txnid
		},
	});

	axiosInstance.interceptors.request.use(
		(req) => {
			const { method, url, headers } = req
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Request: ${method} ${url}`);
			return req
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(res) => {
			const { method, url, headers } = res.config;
			const { status, statusText } = res;
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Response: ${method} ${url}: ${status} - ${statusText}`);
			return res
		},
		(error) => {
			if (error.config) {
				const { method, url, headers } = error.config;
				const { status, statusText } = error.response || { status: error.code, statusText: error.message };
				const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

				logger.addContext('txnid', transactionID)
				logger.error(`Response: ${method} ${url}: ${status} - ${statusText}`);
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance
}

function getMeteringClient(request) {
	const token = request.cookies ? request.cookies.accessTokenGH : '';

	const txnid = request.headers[REQUEST_HEADERS.TRANSACTION_ID];

	!token && logger.info(`unauthenticated request`);

	const axiosInstance = axios.create({
		baseURL: process.env.METERING_API_URL,
		httpsAgent: tlsHelper.getAgentHeaderForSelfSignedCerts(),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
			[REQUEST_HEADERS.TRANSACTION_ID]: txnid,
		},
	});

	axiosInstance.interceptors.request.use(
		(req) => {
			const { method, url, headers } = req
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Request: ${method} ${url}`);
			return req
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(res) => {
			const { method, url, headers } = res.config;
			const { status, statusText } = res;
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Response: ${method} ${url}: ${status} - ${statusText}`);
			return res
		},
		(error) => {
			if (error.config) {
				const { method, url, headers } = error.config;
				const { status, statusText } = error.response || { status: error.code, statusText: error.message };
				const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

				logger.addContext('txnid', transactionID)
				logger.error(`Response: ${method} ${url}: ${status} - ${statusText}`);
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance
}

function getConfigClient(request) {
	const token = request.cookies ? request.cookies.accessTokenGH : '';

	const txnid = request.headers[REQUEST_HEADERS.TRANSACTION_ID];

	!token && logger.info(`unauthenticated request`);

	const axiosInstance = axios.create({
		baseURL: process.env.CONFIG_API_URL,
		httpsAgent: tlsHelper.getAgentHeaderForSelfSignedCerts(),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
			[REQUEST_HEADERS.TRANSACTION_ID]: txnid,
		},
	});

	axiosInstance.interceptors.request.use(
		(req) => {
			const { method, url, headers } = req
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Request: ${method} ${url}`);
			return req
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(res) => {
			const { method, url, headers } = res.config;
			const { status, statusText } = res;
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Response: ${method} ${url}: ${status} - ${statusText}`);
			return res
		},
		(error) => {
			if (error.config) {
				const { method, url, headers } = error.config;
				const { status, statusText } = error.response || { status: error.code, statusText: error.message };
				const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

				logger.addContext('txnid', transactionID)
				logger.error(`Response: ${method} ${url}: ${status} - ${statusText}`);
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance
}

function getDataExchangeClient(request, headers) {
	const token = request.cookies ? request.cookies.accessTokenGH : '';

	const txnid = request.headers[REQUEST_HEADERS.TRANSACTION_ID];

	!token && logger.info(`unauthenticated request`);

	const requestHeaders = {
		"content-type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
		[REQUEST_HEADERS.TRANSACTION_ID]: txnid,
		...headers
	}

	const axiosInstance = axios.create({
		baseURL: process.env.API_BASE_URL,
		httpsAgent: tlsHelper.getAgentHeaderForSelfSignedCerts(),
		headers: requestHeaders,
	});

	axiosInstance.interceptors.request.use(
		(req) => {
			const { method, url, headers } = req
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Request: ${method} ${url}`);
			return req
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(res) => {
			const { method, url, headers } = res.config;
			const { status, statusText } = res;
			const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

			logger.addContext('txnid', transactionID)
			logger.debug(`Response: ${method} ${url}: ${status} - ${statusText}`);
			return res
		},
		(error) => {
			if (error.config) {
				const { method, url, headers } = error.config;
				const { status, statusText } = error.response || { status: error.code, statusText: error.message };
				const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

				logger.addContext('txnid', transactionID)
				logger.error(`Response: ${method} ${url}: ${status} - ${statusText}`);
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance
}

module.exports = {
	getVerifierClient,
	getMeteringClient,
	getConfigClient,
	getDataExchangeClient
};