/* eslint-disable prefer-promise-reject-errors */
/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

/* eslint-disable no-console */
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import REQUEST_HEADERS from '../constants/network';
import { CONFIG_URL, CUSTOMER_URL, LOGIN_URL, LOGOUT_URL, METRICS_URL, PROFILE_URL, USER_URL } from '../constants/paths';

axios.interceptors.request.use(
	(request) => {
		const txId = uuid(); // generate a UUID for this transaction
		request.headers[REQUEST_HEADERS.TRANSACTION_ID] = txId;
		document.body.classList.add('loading-indicator');

		console.log(`[${txId}] - ${request.method} ${request.url}`);

		return request;
	},
	(error) => Promise.reject(error),
);

axios.interceptors.response.use(
	(response) => {
		document.body.classList.remove('loading-indicator');
		const txID = response.config.headers[REQUEST_HEADERS.TRANSACTION_ID];

		console.log(`[${txID}] - ${response.status}`);

		return response;
	},
	(error) => {
		document.body.classList.remove('loading-indicator');

		if (error.isAxiosError) {
			const { status, statusText, config } = error.response;
			const txID = config.headers[REQUEST_HEADERS.TRANSACTION_ID];
			console.error(`[${txID}] - ${status}: ${statusText}`);
			return Promise.reject({ status, statusText });
		}
		const { status, statusText } = error;
		console.error(`${status}: ${statusText}`);
		return Promise.reject({ status, statusText });
	},
);

export const login = async (email, password) => axios.post(LOGIN_URL, { email, password }, { withCredentials: true });
export const forgotPW = async (email) => axios.put(LOGIN_URL, { email });
export const logout = async () => axios.get(LOGOUT_URL, { withCredentials: true });

// Verifier Admin API calls
export const getCustomers = async () => axios.get(CUSTOMER_URL);
export const getCustomer = async (id) => axios.get(`${CUSTOMER_URL}/${id}`);
export const deleteCustomer = async (id) => axios.delete(`${CUSTOMER_URL}/${id}`);
export const addCustomer = async (customerData) => axios.post(CUSTOMER_URL, customerData);

export const getOrganizations = async (custid) => axios.get(`${CUSTOMER_URL}/${custid}/org`);
export const getOrgnaization = async (custid, orgid) => axios.get(`${CUSTOMER_URL}/${custid}/org/${orgid}`);
export const deleteOrganization = async (custid, orgid) => axios.delete(`${CUSTOMER_URL}/${custid}/org/${orgid}`);
export const addOrganization = async (custid, orgData) => axios.post(`${CUSTOMER_URL}/${custid}/org`, orgData);

export const getVerifiers = async (custid, orgid) => axios.get(`${CUSTOMER_URL}/${custid}/org/${orgid}/verifier`);
export const deleteVerifier = async (custid, orgid, verifierid) => axios.delete(`${CUSTOMER_URL}/${custid}/org/${orgid}/verifier/${verifierid}`);
export const addVerifier = async (custid, orgid, verifierData) => axios.post(`${CUSTOMER_URL}/${custid}/org/${orgid}/verifier`, verifierData);
export const getVerifier = async (custid, orgid, verifierid) => axios.get(`${CUSTOMER_URL}/${custid}/org/${orgid}/verifier/${verifierid}/credential`);

export const getUsers = async ({ custid, orgid }) => {
	const URL = orgid ? `${USER_URL}?orgId=${orgid}` : `${USER_URL}?custId=${custid}`;
	return axios.get(URL);
};
export const addUser = async (data) => axios.post(USER_URL, data);
export const deleteUser = async (data) => axios.delete(USER_URL, data);
export const resetUser = async (data) => axios.put(USER_URL, data);

// Metrics API calls
export const queryMetrics = async (cID, oID, data) => axios.post(`${METRICS_URL}?cID=${cID}&oID=${oID}`, data);

// Configuration calls (gets old and new configurations)
export const getMasterConfigs = async () => axios.get(`${CONFIG_URL}?master_catalog=true`);
export const getCustomerConfigs = async (cID, versions) => axios.get(`${CONFIG_URL}?customerId=${cID}&versions=${versions}`);
export const getConfig = async (cID, id, version) => axios.get(`${CONFIG_URL}/${id}/${version}?cID=${cID}`);
export const deleteConfig = async (cID, id, version) => axios.delete(`${CONFIG_URL}/${id}/${version}?cID=${cID}`);
export const createConfig = async (cID, modifiedConfig) => axios.post(`${CONFIG_URL}?cID=${cID}`, modifiedConfig);
export const createValueSet = async (valueSet) => axios.post(`${CONFIG_URL}/value-sets`, valueSet);

// Profile calls
// export const createProfile = async (profileId, profileData) => axios.post(`${PROFILE_URL}/${profileId}`, profileData);
// export const getProfile = async (profileId) => axios.get(`${PROFILE_URL}/${profileId}`);
export const addConfigToProfile = async (profileId, profileData) => axios.patch(`${PROFILE_URL}/${profileId}/addconfig`, profileData);
// export const deleteConfigFromProfile = async (profileId, profileData) => axios.patch(`${PROFILE_URL}}/${profileId}/deleteconfig`, profileData);
// export const deleteProfile = async (profileId) => axios.delete(`${PROFILE_URL}/${profileId}`);
