/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

/*
 * These hooks re-implement the now removed useBlocker and usePrompt hooks in 'react-router-dom'.
 */
/* eslint-disable consistent-return */
import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */
function useBlocker(blocker, when = true) {
	const { navigator } = useContext(NavigationContext);

	useEffect(() => {
		if (!when) return;

		const unblock = navigator.block((tx) => {
			const autoUnblockingTx = {
				...tx,
				retry() {
					// Automatically unblock the transition so it can play all the way
					// through before retrying it. TODO: Figure out how to re-enable
					// this block if the transition is cancelled for some reason.
					unblock();
					tx.retry();
				},
			};

			blocker(autoUnblockingTx);
		});

		return unblock;
	}, [navigator, blocker, when]);
}

export default useBlocker;
