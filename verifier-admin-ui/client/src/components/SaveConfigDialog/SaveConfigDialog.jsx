/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useState, useEffect, useRef } from 'react';
import { TextInput, Button } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

import useForm from '../../hooks/useForm';
import { validateConfigInput as validate } from '../../utils/formValidationRules';

import S from './SaveConfigDialog.styles';
import { changeRoleBySpan } from '../../utils/changeAtrribute';

const SaveConfigDialog = ({ data, open, serverError, onCancelCallback, onSaveCallback }) => {
	const { values, handleChange, handleSubmit, errors } = useForm(data, onSaveCallback, validate);

	const [error, setError] = useState();

	const { t } = useTranslation();
	const BTN_CANCEL = t('SAVE_CONFIG_DIALOG:btnCancel');
	const BTN_ADD = t('SAVE_CONFIG_DIALOG:btnAdd');
	const MODAL_HEADING = t('SAVE_CONFIG_DIALOG:modalHeading');
	const LBL_CONFIG_NAME = t('SAVE_CONFIG_DIALOG:name');
	const PLACEHOLDER_CONFIG_NAME = t('SAVE_CONFIG_DIALOG:placeholder_name');
	const LBL_CONFIG_VERSION = t('SAVE_CONFIG_DIALOG:version');
	const PLACEHOLDER_CONFIG_VERSION = t('SAVE_CONFIG_DIALOG:placeholder_version');
	const nameRef = useRef();

	useEffect(() => {
		nameRef.current.focus();
	}, [open]);

	useEffect(() => {
		changeRoleBySpan();
	}, []);

	useEffect(() => {
		setError(serverError);
	}, [serverError]);

	return (
		<S.SaveConfigDialog id="saveConfigComponent" modalHeading={MODAL_HEADING} size="sm" passiveModal open={open}>
			<S.MainContent>
				<S.Content>
					<form id="saveAsForm" onSubmit={handleSubmit}>
						<div className="formRow">
							<div id="name-error-msg">
								<TextInput
									id="name"
									name="name"
									maxLength={255}
									labelText={LBL_CONFIG_NAME}
									placeholder={PLACEHOLDER_CONFIG_NAME}
									value={values?.name || ''}
									onChange={(e) => handleChange(e.target.id, e.target.value)}
									invalid={!!errors.name}
									invalidText={errors.name}
									ref={nameRef}
								/>
							</div>
							<div id="version-error-msg">
								<TextInput
									id="version"
									name="version"
									labelText={LBL_CONFIG_VERSION}
									placeholder={PLACEHOLDER_CONFIG_VERSION}
									value={values?.version || ''}
									onChange={(e) => {
										setError();
										handleChange(e.target.id, e.target.value);
									}}
									invalid={!!errors.version}
									invalidText={errors.version}
								/>
							</div>
							<S.Error>{error}</S.Error>
						</div>
					</form>
				</S.Content>
			</S.MainContent>

			<S.Buttons>
				<div className="bx--modal-footer bx--btn-set">
					<Button kind="secondary" form="saveAsForm" onClick={onCancelCallback}>
						{BTN_CANCEL}
					</Button>
					<Button kind="primary" type="submit" disabled={errors && Object.keys(errors).length > 0} form="saveAsForm">
						{BTN_ADD}
					</Button>
				</div>
			</S.Buttons>
		</S.SaveConfigDialog>
	);
};

export default SaveConfigDialog;
