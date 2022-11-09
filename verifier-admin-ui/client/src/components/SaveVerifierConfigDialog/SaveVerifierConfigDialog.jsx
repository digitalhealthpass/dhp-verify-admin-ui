/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef, useCallback } from 'react';
import { TextInput, RadioButtonGroup, RadioButton, Modal, Checkbox } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { Warning16 } from '@carbon/icons-react';

import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { validateVerifierConfigInput as validate } from '../../utils/formValidationRules';
import { changeRoleBySpan } from '../../utils/changeAtrribute';

import S from './SaveVerifierConfigDialog.styles';

const SaveVerifierConfigDialog = ({ data, open, canSaveToMaster, canModifyCustConfig, serverError, onCancelCallback, onSaveCallback, configList, invalidRules }) => {
	const { values, handleChange, handleSubmit, errors } = useForm(data, onSaveCallback, validate);

	const { user } = useAuth();
	const [error, setError] = useState();
	const [isUpdate, setIsUpdate] = useState(false);

	const { t } = useTranslation();
	const BTN_CANCEL = t('SAVE_VERIFIER_CONFIG_DIALOG:btnCancel');
	const BTN_SAVE = t('SAVE_VERIFIER_CONFIG_DIALOG:btnSave');
	const MODAL_HEADING = t('SAVE_VERIFIER_CONFIG_DIALOG:modalHeading');
	const LBL_CONFIG_NAME = t('SAVE_VERIFIER_CONFIG_DIALOG:name');
	const PLACEHOLDER_CONFIG_NAME = t('SAVE_VERIFIER_CONFIG_DIALOG:placeholder_name');
	const CHKBOX_RECEIVE_UPDATES = t('SAVE_VERIFIER_CONFIG_DIALOG:chkboxReceiveUpdates');
	const SAVE_AS_CUST_CONFIG = t('SAVE_VERIFIER_CONFIG_DIALOG:saveAsCustConfig');
	const SAVE_AS_MASTER_CONFIG = t('SAVE_VERIFIER_CONFIG_DIALOG:saveAsMasterConfig');
	const MODIFY_CUST_CONFIG = t('SAVE_VERIFIER_CONFIG_DIALOG:modifyCustConfig');
	const MODIFY_MASTER_CONFIG = t('SAVE_VERIFIER_CONFIG_DIALOG:modifyMasterConfig');

	const nameRef = useRef();
	const originalName = useRef(data.name);

	useEffect(() => {
		nameRef.current.focus();
	}, [open]);

	useEffect(() => {
		changeRoleBySpan();
	}, []);

	useEffect(() => {
		setError(serverError);
	}, [serverError]);

	const onNameChangeHandler = useCallback(
		(e) => {
			handleChange(e.target.id, e.target.value, configList);
		},
		[handleChange, configList],
	);

	const onRadioButtonChangedHandler = useCallback(
		(radioButtonValue) => {
			if (radioButtonValue === 'updateMasterConfig' || radioButtonValue === 'updateCustConfig') {
				setIsUpdate(true);
				values.name = originalName.current;
				handleChange('name', originalName.current, configList);
			} else {
				setIsUpdate(false);
			}

			handleChange('saveType', radioButtonValue, configList);
		},
		[handleChange, values, configList],
	);

	const onCheckboxChangeHandler = useCallback(
		(value, id) => {
			handleChange(id, value, configList);
		},
		[handleChange, configList],
	);

	const onCancelHandler = useCallback(() => {
		onCancelCallback();
	}, [onCancelCallback]);

	const onSaveHandler = useCallback(
		(e) => {
			handleSubmit(e, configList);
		},
		[handleSubmit, configList],
	);

	return (
		<Modal
			id="saveConfigComponent"
			modalHeading={MODAL_HEADING}
			size="lg"
			open={open}
			preventCloseOnClickOutside
			primaryButtonText={BTN_SAVE}
			secondaryButtonText={BTN_CANCEL}
			onRequestSubmit={onSaveHandler}
			onSecondarySubmit={onCancelHandler}
		>
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
									onChange={onNameChangeHandler}
									invalid={!!errors.name}
									invalidText={errors.name}
									ref={nameRef}
									disabled={isUpdate}
								/>
							</div>

							{user.isSysAdmin && (
								<RadioButtonGroup
									id="saveType"
									defaultSelected="createCustConfig"
									legend="Group Legend"
									name="saveType"
									valueSelected="createCustConfig"
									orientation="vertical"
									onChange={onRadioButtonChangedHandler}
								>
									<RadioButton id="radio-3" labelText={SAVE_AS_CUST_CONFIG} value="createCustConfig" />

									<RadioButton id="radio-4" labelText={MODIFY_CUST_CONFIG} value="updateCustConfig" disabled={!canModifyCustConfig} />

									<RadioButton id="radio-2" labelText={SAVE_AS_MASTER_CONFIG} value="createMasterConfig" disabled={!canSaveToMaster} />

									<RadioButton id="radio-1" labelText={MODIFY_MASTER_CONFIG} value="updateMasterConfig" disabled={!canSaveToMaster} />
								</RadioButtonGroup>
							)}

							<Checkbox id="receiveUpdates" name="receiveUpdates" checked={values.receiveUpdates && true} labelText={CHKBOX_RECEIVE_UPDATES} onChange={onCheckboxChangeHandler} />

							<S.Error>{error}</S.Error>
							{invalidRules && (
								<>
									<Warning16
										style={{
											fill: 'red',
											verticalAlign: 'middle',
											marginRight: '0.5rem',
										}}
										alt="Warning"
									/>
									Invalid rules configuration detected, disabled specification should not contain enabled rules.
								</>
							)}
						</div>
					</form>
				</S.Content>
			</S.MainContent>
		</Modal>
	);
};

export default SaveVerifierConfigDialog;
