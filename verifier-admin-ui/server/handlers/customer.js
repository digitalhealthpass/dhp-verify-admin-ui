/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const axios = require('../helpers/axiosClient');

exports.getCustomers = async (request, response) => {
    try {
        const client = axios.getVerifierClient(request);
        const apiResponse = await client.get('/admin/customer');
        const { data } = apiResponse.data.customers;
        const dataWithId = data.map((row) => { return { ...row, id: row.customerId } })

        return response.status(apiResponse.status).send(dataWithId);
    } catch (error) {
        const { status, data } = error.response;
        return response.status(status).send(data);
    }
};

exports.addCustomer = async (request, response) => {
    try {
        const client = axios.getVerifierClient(request);
        const custData = request.body;

        const apiResponse = await client.post('/admin/customer', custData);
        const { status, data } = apiResponse;

        return response.status(status).send(data);
    } catch (error) {
        const { status, data } = error.response;
        return response.status(status).send(data);
    }
};

exports.deleteCustomer = async (request, response, next) => {
    try {
        const client = axios.getVerifierClient(request);
        const { custid } = request.params;

        const apiResponse = await client.delete(`/admin/customer/${custid}`);
        const { status, data } = apiResponse;
        
        return response.status(status).send(data);
    } catch (error) {
        const { status, data } = error.response;
        return response.status(status).send(data);
    }
};