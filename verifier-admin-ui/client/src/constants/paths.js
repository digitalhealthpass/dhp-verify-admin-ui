/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

// NOTE:for production, SERVER_ROOT is '' which makes the urls relative, thus allowing the router in the server to handle the request
// for dev, SERVER_ROOT is typically 'http://localhost:5000' or whever the Server Node Express instance is running
// Note: create-react-app prefixes commandline environment variables with `REACT_APP_` by default. https://create-react-app.dev/docs/adding-custom-environment-variables/
export const SERVER_ROOT = '/verifier-admin';

// Pages
export const LANDING_PATH = '/home';
export const ADMIN_PATH = '/admins';
export const CUST_PATH = '/customers';
export const ORG_PATH = '/organizations';
export const VER_PATH = '/credentials';
export const CONFIG_LIST_PATH = '/configurations';
export const VERIFIER_CONFIG_DETAIL_PATH = '/verifier-configurations';
export const CONFIG_DETAIL_PATH = '/config';
export const UNAUTH_PATH = '/unauthorized';
export const LOGOUT_PATH = '/logout';
export const LOGIN_PATH = '/login';
export const METRICS_PATH = '/metrics';
export const CREATE_CRED_PATH = '/credential';

export const ERROR_URL = `${SERVER_ROOT}/error`;

// API calls
export const LOGIN_URL = `${SERVER_ROOT}/api/login`;
export const LOGOUT_URL = `${SERVER_ROOT}/api/logout`;
export const CUSTOMER_URL = `${SERVER_ROOT}/api/customer`;
export const USER_URL = `${SERVER_ROOT}/api/user`;

export const METRICS_URL = `${SERVER_ROOT}/api/metrics/verifier/query`;
export const CONFIG_URL = `${SERVER_ROOT}/api/config`;
export const PROFILE_URL = `${SERVER_ROOT}/api/profile`;
