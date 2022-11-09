/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import CustomersPage from '../pages/CustomersPage/CustomersPage';
import OrganizationsPage from '../pages/OrganizationsPage/OrganizationsPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import CredentialListPage from '../pages/CredentialListPage/CredentialListPage';
import ConfigListPage from '../pages/ConfigListPage/ConfigListPage';
import ConfigDetailPage from '../pages/ConfigDetailPage/ConfigDetailPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import MetricsPage from '../pages/MetricsPage/MetricsPage';
import CreateCredentialPage from '../pages/CreateCredentialPage/CreateCredentialPage';
import VerifierConfigDetailsPage from '../pages/VerifierConfigDetailsPage/VerifierConfigDetailsPage';

import Roles from '../constants/roles';
import { LANDING_PATH, ADMIN_PATH, METRICS_PATH, CUST_PATH, ORG_PATH, VER_PATH, CREATE_CRED_PATH, CONFIG_LIST_PATH, CONFIG_DETAIL_PATH, VERIFIER_CONFIG_DETAIL_PATH } from '../constants/paths';

const routes = [
	{
		path: LANDING_PATH,
		element: <LandingPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN, Roles.ORGADMIN],
	},
	{
		path: ADMIN_PATH,
		element: <AdminPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN],
	},
	{
		path: METRICS_PATH,
		element: <MetricsPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN],
	},
	{
		path: CUST_PATH,
		element: <CustomersPage />,
		allowedRoles: [Roles.DHPADMIN],
	},
	{
		path: ORG_PATH,
		element: <OrganizationsPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN],
	},
	{
		path: VER_PATH,
		element: <CredentialListPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN, Roles.ORGADMIN],
	},
	{
		path: CREATE_CRED_PATH,
		element: <CreateCredentialPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN, Roles.ORGADMIN],
	},
	{
		path: CONFIG_LIST_PATH,
		element: <ConfigListPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN, Roles.ORGADMIN],
	},
	{
		path: CONFIG_DETAIL_PATH,
		element: <ConfigDetailPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN, Roles.ORGADMIN],
	},
	{
		path: VERIFIER_CONFIG_DETAIL_PATH,
		element: <VerifierConfigDetailsPage />,
		allowedRoles: [Roles.DHPADMIN, Roles.CUSTADMIN, Roles.ORGADMIN],
	},
];

export default routes;
