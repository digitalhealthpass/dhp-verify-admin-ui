/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const useProvideAppContext = () => {
	const initialState = useMemo(
		() => ({
			custId: -1,
			custName: undefined,
			orgId: -1,
			orgName: undefined,
		}),
		[],
	);

	const [appContext, setAppContext] = useState(initialState);

	const getAppContext = useCallback(() => appContext, [appContext]);

	const clearAppContext = useCallback(() => {
		setAppContext(initialState);
	}, [initialState]);

	const setOrgContext = useCallback(
		({ orgId, orgName }) => {
			setAppContext({ ...appContext, orgId, orgName });
		},
		[appContext],
	);

	const clearOrgContext = useCallback(() => {
		setAppContext({ ...appContext, orgId: -1, orgName: undefined });
	}, [appContext]);

	const setCustConext = useCallback(
		({ custId, custName }) => {
			clearOrgContext();
			setAppContext({ ...appContext, custId, custName });
		},
		[clearOrgContext, setAppContext, appContext],
	);

	const clearCustContext = useCallback(() => {
		setAppContext(initialState);
	}, [initialState]);

	useEffect(() => {
		// restore app context from session storage if it exists
		const storedAppContext = window.sessionStorage.getItem('verifier-app-context');
		if (storedAppContext) {
			setAppContext(JSON.parse(storedAppContext));
		}
	}, []);

	useEffect(() => {
		// save app context to session storage
		window.sessionStorage.setItem('verifier-app-context', JSON.stringify(appContext));
	});

	return {
		getAppContext,
		setCustConext,
		setOrgContext,
		clearAppContext,
		clearOrgContext,
		clearCustContext,
	};
};

const appContext = createContext();
export const useAppContext = () => useContext(appContext);

export const ProvideApp = ({ children }) => {
	const context = useProvideAppContext();
	return <appContext.Provider value={context}>{children}</appContext.Provider>;
};
