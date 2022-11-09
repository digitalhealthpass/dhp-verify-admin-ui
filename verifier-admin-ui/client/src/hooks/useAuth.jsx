/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { createContext, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Roles from '../constants/roles';
import { login as appLogin, logout as appLogout } from '../services/dataService';

const useProvideAuth = () => {
	const initialStateUser = {
		authenticated: false,
		userName: null,
		roles: [],
		userId: null,
		orgId: null,
		customerId: null,
		orgName: null,
		customerName: null,
		isSysAdmin: false,
		isCustAdmin: false,
		isOrgAdmin: false,
	};

	const navigate = useNavigate();

	const [user, setUser] = useState(initialStateUser);

	const login = async ({ email, password }) => {
		try {
			const response = await appLogin(email, password);
			if (response.status === 201) {
				const { scope, userId, customerId, customerName, orgId, orgName } = response.data;

				const roles = scope.split(' ');
				const isSysAdmin = roles.includes(Roles.DHPADMIN);
				const isCustAdmin = roles.includes(Roles.CUSTADMIN);
				const isOrgAdmin = roles.includes(Roles.ORGADMIN);

				const updatedUserStatus = {
					...user,
					authenticated: true,
					userName: email,
					userId,
					customerId,
					customerName,
					orgId,
					orgName,
					roles,
					isSysAdmin,
					isCustAdmin,
					isOrgAdmin,
				};

				setUser(updatedUserStatus);
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	};

	const logout = async ({ redirect = '/' }) => {
		const response = await appLogout();

		if (response.status === 200) {
			setUser(initialStateUser);
		}
		navigate(redirect);
	};

	return {
		user,
		setUser,
		login,
		logout,
	};
};

const authContext = createContext();
export const useAuth = () => useContext(authContext);

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
