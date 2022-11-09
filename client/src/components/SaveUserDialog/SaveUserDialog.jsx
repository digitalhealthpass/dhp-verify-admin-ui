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
import { validateUserInput as validate } from '../../utils/formValidationRules';
import { changeRoleBySpan } from '../../utils/changeAtrribute';

import S from './SaveUserDialog.styles';

const SaveUserDialog = ({ data, open, onCancelCallback, onSaveCallback }) => {
	const { values, handleChange, handleSubmit, errors } = useForm(data, onSaveCallback, validate);

	const { t } = useTranslation();
	const BTN_CANCEL = t('SAVE_USER_DIALOG:btnCancel');
	const BTN_ADD = t('SAVE_USER_DIALOG:btnAdd');
	const MODAL_HEADING = t('SAVE_USER_DIALOG:modalHeading');
	const SECTION_HEADING_ADMIN = t('SAVE_USER_DIALOG:adminInfo');
	const LBL_FIRST_NAME = t('SAVE_USER_DIALOG:firstName');
	const LBL_LAST_NAME = t('SAVE_USER_DIALOG:lastName');
	const LBL_EMAIL_NAME = t('SAVE_USER_DIALOG:email');
	const PLACEHOLDER_FIRST_NAME = t('SAVE_USER_DIALOG:placeHolder_firstName');
	const PLACEHOLDER_LAST_NAME = t('SAVE_USER_DIALOG:placeHolder_lastName');
	const PLACEHOLDER_EMAIL = t('SAVE_USER_DIALOG:placeHolder_email');
	const HELP_TEXT = t('SAVE_USER_DIALOG:helpText');
	const firstNameRef = useRef();

	useEffect(() => {
		firstNameRef.current.focus();
	}, [open]);

	useEffect(() => {
		changeRoleBySpan();
	}, []);
	return (
		<S.Dialog id="newUserDialog" modalHeading={MODAL_HEADING} passiveModal open={open}>
			<S.MainContent>
				<S.Content>
					<S.HelpText>{HELP_TEXT}</S.HelpText>
					<form id="adminForm" onSubmit={handleSubmit}>
						<div className="formSection">{SECTION_HEADING_ADMIN}</div>
						<div className="formRow">
							<div id="firstName-error-msg">
								<TextInput
									id="firstName"
									name="firstName"
									labelText={LBL_FIRST_NAME}
									placeholder={PLACEHOLDER_FIRST_NAME}
									value={values?.firstName || ''}
									onChange={(e) => handleChange(e.target.id, e.target.value)}
									invalid={!!errors.firstName}
									invalidText={errors.firstName}
									ref={firstNameRef}
								/>
							</div>
							<div id="lastName-error-msg">
								<TextInput
									id="lastName"
									name="lastName"
									labelText={LBL_LAST_NAME}
									placeholder={PLACEHOLDER_LAST_NAME}
									value={values?.lastName || ''}
									onChange={(e) => handleChange(e.target.id, e.target.value)}
									invalid={!!errors.lastName}
									invalidText={errors.lastName}
								/>
							</div>
						</div>
						<div className="formRow">
							<div id="email-error-msg">
								<TextInput
									id="email"
									name="email"
									labelText={LBL_EMAIL_NAME}
									placeholder={PLACEHOLDER_EMAIL}
									value={values?.email || ''}
									onChange={(e) => handleChange(e.target.id, e.target.value)}
									invalid={!!errors.email}
									invalidText={errors.email}
								/>
							</div>
						</div>
					</form>
				</S.Content>
			</S.MainContent>

			<S.Buttons>
				<div className="bx--modal-footer bx--btn-set">
					<Button kind="secondary" form="adminForm" onClick={onCancelCallback}>
						{BTN_CANCEL}
					</Button>
					<Button kind="primary" type="submit" disabled={errors && Object.keys(errors).length > 0} form="adminForm">
						{BTN_ADD}
					</Button>
				</div>
			</S.Buttons>
		</S.Dialog>
	);
};

export default SaveUserDialog;
