/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useState, useCallback } from 'react';

const useToggle = (initialValue = false) => {
	const [value, setValue] = useState(initialValue);

	const toggle = useCallback(() => {
		setValue((v) => !v);
	}, []);

	return [value, toggle];
};

export default useToggle;
