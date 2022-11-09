/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LANDING_PATH } from '../constants/paths';
import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const { user } = useAuth();
	const { authenticated } = user;

	const authorized = user?.roles?.find((role) => allowedRoles?.includes(role));

	if (!authenticated) {
		return <Navigate to="/login" state={{ from: LANDING_PATH }} replace />;
	}

	if (!authorized) {
		return <Navigate to="/unauthorized" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default RequireAuth;
