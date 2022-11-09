/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useCallback } from 'react';
import { SideNav, SideNavItems, SideNavMenuItem } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

const ConfigCredType = ({ values, selectedValue, onChangeCallback }) => {
	const { t } = useTranslation();
	const CREDENTIAL_TYPES = t('CONFIG_DETAILS_PAGE:lblCredType');

	const onClickHandler = useCallback(
		(value) => {
			onChangeCallback(value);
		},
		[onChangeCallback],
	);

	const onKeyPressHandler = useCallback(
		(evt, value) => {
			if (evt.code === 'Enter') {
				onChangeCallback(value);
			}
		},
		[onChangeCallback],
	);

	return (
		<div>
			{values && (
				<SideNav isFixedNav expanded isChildOfHeader={false} aria-label={CREDENTIAL_TYPES}>
					<SideNavItems>
						{values.map(({ name, value }) => (
							<SideNavMenuItem tabIndex={0} isActive={selectedValue === value} onClick={() => onClickHandler(value)} onKeyPress={(evt) => onKeyPressHandler(evt, value)} key={value}>
								{name}
							</SideNavMenuItem>
						))}
					</SideNavItems>
				</SideNav>
			)}
		</div>
	);
};

export default ConfigCredType;
