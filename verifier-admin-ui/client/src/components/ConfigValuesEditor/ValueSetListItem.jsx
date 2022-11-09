/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { SideNavMenuItem } from 'carbon-components-react';
import { useCallback } from 'react';

const ValueSetListItem = ({ valueSet, selectedValue, onClickCallback }) => {
	const onClickHandler = useCallback(
		(value) => {
			onClickCallback(value.id);
		},
		[onClickCallback],
	);

	const onKeyPressHandler = useCallback(
		(evt, value) => {
			if (evt.code === 'Enter') {
				onClickCallback(value.id);
			}
		},
		[onClickCallback],
	);

	return (
		<SideNavMenuItem tabIndex={0} isActive={selectedValue === valueSet} onClick={() => onClickHandler(valueSet)} onKeyPress={(evt) => onKeyPressHandler(evt, valueSet)} key={valueSet.id}>
			{valueSet.name}
		</SideNavMenuItem>
	);
};

export default ValueSetListItem;
