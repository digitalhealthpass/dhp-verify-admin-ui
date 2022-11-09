/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useEffect, useRef } from 'react';
import { TextInput, Button } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

import useForm from '../../hooks/useForm';
import { validateOrganizationInput as validate } from '../../utils/formValidationRules';
import { changeRoleBySpan } from '../../utils/changeAtrribute';
import S from './OrganizationDialog.styles';

const OrganizationDialog = ({ data, open, onCancelCallback, onSaveCallback }) => {
	const { values, handleChange, handleSubmit, errors } = useForm(data, onSaveCallback, validate);

	const { t } = useTranslation();
	const BTN_CANCEL = t('ORGANIZATION_DIALOG:btnCancel');
	const BTN_ADD = t('ORGANIZATION_DIALOG:btnAdd');
	const MODAL_HEADING = t('ORGANIZATION_DIALOG:modalHeading');
	const LBL_ORG_NAME = t('ORGANIZATION_DIALOG:orgName');
	const PLACEHOLDER_ORG_NAME = t('ORGANIZATION_DIALOG:placeHolder_orgName');
	const HELP_TEXT = t('ORGANIZATION_DIALOG:helpText');
	const labelRef = useRef();

	useEffect(() => {
		labelRef.current.focus();
	}, [open]);

	useEffect(() => {
		changeRoleBySpan();
	}, []);

	return (
		<S.Dialog id="newOrganizationComponent" modalHeading={MODAL_HEADING} passiveModal open={open}>
			<S.MainContent>
				<S.Content>
					<form id="organizationForm" onSubmit={handleSubmit}>
						<S.HelpText>{HELP_TEXT}</S.HelpText>

						<div className="formRow">
							<TextInput
								id="label"
								name="label"
								inline
								light
								labelText={LBL_ORG_NAME}
								placeholder={PLACEHOLDER_ORG_NAME}
								value={values?.label || ''}
								onChange={(e) => handleChange(e.target.id, e.target.value)}
								invalid={!!errors.orgName}
								invalidText={errors.orgName}
								ref={labelRef}
							/>
						</div>
					</form>
				</S.Content>
			</S.MainContent>

			<S.Buttons>
				<div className="bx--modal-footer bx--btn-set">
					<Button kind="secondary" form="organizationForm" onClick={onCancelCallback}>
						{BTN_CANCEL}
					</Button>
					<Button kind="primary" type="submit" disabled={errors && Object.keys(errors).length > 0} form="organizationForm">
						{BTN_ADD}
					</Button>
				</div>
			</S.Buttons>
		</S.Dialog>
	);
};

export default OrganizationDialog;
