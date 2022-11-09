/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const axios = require('../helpers/axiosClient');
const logger = require('../config/logger').getLogger('auth-handler');
const LOGIN_URL = require('../constants/paths').LOGIN_URL
const USER_ATTRS_URL = require('../constants/paths').USER_ATTRS_URL

const isProduction = process.env.NODE_ENV !== 'development';

exports.login = async (request, response) => {
    logger.info(`User login ${request.body.email}`);
    try {
        // Obtain access token
        const { data } = await axios.getVerifierClient(request).post(LOGIN_URL, request.body);

        const accessToken = data.access_token;
        const maxAge = data.expires_in * 1000;

        // Set cookie
        response.cookie('accessTokenGH', accessToken, {
            maxAge,
            secure: isProduction,
            httpOnly: true,
            sameSite: isProduction ? 'Strict' : false,
        });

        const { scope, customerId, orgId, userId, customerName, orgName } = data;

        return response.status(201).send({ message: 'Login successfully', scope, customerId, orgId, userId, customerName, orgName });
    } catch (error) {
        if (error.code) {
            // network errors follow this path
            return response.status(500).send(error.message);
         }
        else {
            // invalid credentials follow this path
            return response.status(error.response.status).send(error.message);
        }
    }
};

exports.logout = async (request, response) => {
    logger.info(`User logout`);
    response.clearCookie('accessTokenGH');
    return response.status(200).send({ message: 'Logged out' });
};

exports.forgotPW = async (request, response) => {
    logger.info(`forgot password ${request.body.email}`);
    return response.status(200).send({ message: '' });
}

exports.attributes = async (request, response) => {
    logger.info('User Attributes');

    try {
        const { data } = await axios.getDataExchangeClient(request).get(USER_ATTRS_URL);
        return response.status(200).send({ message: 'Custom attributes found', org: data.org });
    } catch (e) {
        logger.error(`User atttributes request failed: ${error.message}`);
        return response.status(400).send({ message: 'Failed to get user attributes' });
    }
};
