/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useBlocker from './useBlocker';

const useCallbackPrompt = (when) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showPrompt, setShowPrompt] = useState(false);
	const [lastLocation, setLastLocation] = useState();
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);

	const cancelNavigationCallback = useCallback(() => {
		setShowPrompt(false);
	}, []);

	// handle blocking when user click on another route prompt will be shown
	const handleBlockedNavigation = useCallback(
		(nextLocation) => {
			// in if condition we are checking next location and current location are equals or not
			if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
				setShowPrompt(true);
				setLastLocation(nextLocation);
				return false;
			}
			return true;
		},
		[confirmedNavigation, location.pathname],
	);

	const confirmNavigationCallback = useCallback(() => {
		setShowPrompt(false);
		setConfirmedNavigation(true);
	}, []);

	useEffect(() => {
		if (confirmedNavigation && lastLocation) {
			const indexOfBackSlash = lastLocation.location.pathname.lastIndexOf('/');
			const path = lastLocation.location.pathname.substr(indexOfBackSlash, lastLocation.location.pathname.length);
			navigate(path);
		}
	}, [confirmedNavigation, lastLocation, navigate]);

	useBlocker(handleBlockedNavigation, when);

	return [showPrompt, confirmNavigationCallback, cancelNavigationCallback];
};

export default useCallbackPrompt;
