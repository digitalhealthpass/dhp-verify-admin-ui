/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useTranslation } from 'react-i18next';
import { Modal } from 'carbon-components-react';

const NavigationConfirmDialog = ({ showDialog, cancelNavigationCallback, confirmNavigationCallback }) => {
	const { t } = useTranslation();
	const BTN_CANCEL = t('NAVIGATION_CONFIRM_DIALOG:btnCancel');
	const BTN_DISCARD = t('NAVIGATION_CONFIRM_DIALOG:btnDiscard');
	const MODAL_HEADING = t('NAVIGATION_CONFIRM_DIALOG:modalHeading');
	const MESSAGE = t('NAVIGATION_CONFIRM_DIALOG:message');

	return (
		<Modal
			id="saveConfigComponent"
			modalHeading={MODAL_HEADING}
			size="sm"
			open={showDialog}
			danger
			preventCloseOnClickOutside
			primaryButtonText={BTN_DISCARD}
			secondaryButtonText={BTN_CANCEL}
			onRequestSubmit={confirmNavigationCallback}
			onSecondarySubmit={cancelNavigationCallback}
		>
			{MESSAGE}
		</Modal>
	);
};

export default NavigationConfirmDialog;
