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
import { validateCustomerInput as validate } from '../../utils/formValidationRules';
import { changeRoleBySpan } from '../../utils/changeAtrribute';
import S from './CustomerDialog.styles';

const CustomerDialog = ({ data, open, onCancelCallback, onSaveCallback }) => {
	const { values, handleChange, handleSubmit, errors } = useForm(data, onSaveCallback, validate);

	const { t } = useTranslation();
	const BTN_CANCEL = t('CUSTOMER_DIALOG:btnCancel');
	const BTN_ADD = t('CUSTOMER_DIALOG:btnAdd');
	const MODAL_HEADING = t('CUSTOMER_DIALOG:modalHeading');
	// const MODAL_LABEL = t('CUSTOMER_DIALOG:modalLabel');
	const SECTION_HEADING_CUST_INFO = t('CUSTOMER_DIALOG:custInfo');
	const SECTION_HEADING_CUST_ADMIN = t('CUSTOMER_DIALOG:custAdmin');
	const LBL_FIRST_NAME = t('CUSTOMER_DIALOG:firstName');
	const LBL_LAST_NAME = t('CUSTOMER_DIALOG:lastName');
	const LBL_EMAIL = t('CUSTOMER_DIALOG:email');
	const LBL_CUST_NAME = t('CUSTOMER_DIALOG:custName');
	const LBL_BILLING_ID = t('CUSTOMER_DIALOG:billingID');
	const PLACEHOLDER_BILLING_ID = t('CUSTOMER_DIALOG:placeHolder_billingID');
	const PLACEHOLDER_CUST_NAME = t('CUSTOMER_DIALOG:placeHolder_custName');
	const PLACEHOLDER_FIRST_NAME = t('CUSTOMER_DIALOG:placeHolder_firstName');
	const PLACEHOLDER_LAST_NAME = t('CUSTOMER_DIALOG:placeHolder_lastName');
	const PLACEHOLDER_EMAIL = t('CUSTOMER_DIALOG:placeHolder_email');
	const HELP_TEXT = t('CUSTOMER_DIALOG:helpText');
	const billingIdRef = useRef();

	useEffect(() => {
		billingIdRef.current.focus();
	}, [open]);

	useEffect(() => {
		changeRoleBySpan();
	}, []);

	return (
		<S.CustomerDialog
			id="newCustomerComponent"
			modalHeading={MODAL_HEADING}
			// modalLabel={MODAL_LABEL}
			size="sm"
			passiveModal
			open={open}
		>
			<S.MainContent>
				<S.Content>
					<form id="customerForm" onSubmit={handleSubmit}>
						<S.HelpText>{HELP_TEXT}</S.HelpText>

						<div className="formSection">{SECTION_HEADING_CUST_INFO}</div>
						<div className="formRow">
							<div id="billingId-error-msg">
								<TextInput
									id="billingId"
									name="billingId"
									labelText={LBL_BILLING_ID}
									placeholder={PLACEHOLDER_BILLING_ID}
									value={values?.billingId || ''}
									onChange={(e) => handleChange(e.target.id, e.target.value)}
									invalid={!!errors.billingId}
									invalidText={errors.billingId}
									ref={billingIdRef}
								/>
							</div>
							<div id="label-error-msg">
								<TextInput
									id="label"
									name="label"
									labelText={LBL_CUST_NAME}
									placeholder={PLACEHOLDER_CUST_NAME}
									value={values?.label || ''}
									onChange={(e) => handleChange(e.target.id, e.target.value)}
									invalid={!!errors.label}
									invalidText={errors.label}
								/>
							</div>
						</div>

						{/* <div className='formRow hidden'>
							<Select
								defaultValue="placeholder-item"
								id="businessType"
								name="businessType"
								labelText="Business type (optional):"
								value={values?.businessType || 'placeholder-item'}
								text="Choose an option"
								onChange={(e) => handleChange(e.target.id, e.target.value)}
								invalid={!!errors.businessType}
								invalidText={errors.businessType}
							>
								<SelectItem
									disabled
									hidden
									text="Choose an option"
									value="placeholder-item"
								/>
								<SelectItem
									text="Option 1"
									value="option-1"
								/>
							</Select> */}

						{/* <Select
								defaultValue="placeholder-item"
								id="numOfEmployees"
								name="numOfEmployees"
								labelText="Number of Employees (optional):"
								value={values?.numOfEmployees || 'placeholder-item'}
								text="Choose an option"
								onChange={(e) => handleChange(e.target.id, e.target.value)}
								invalid={errors.numOfEmployees}
								invalidText={errors.numOfEmployees}
							>
								<SelectItem
									disabled
									hidden
									text="Choose an option"
									value="placeholder-item"
								/>
								<SelectItem
									text="0-100"
									value="100"
								/>
								<SelectItem
									text="100-500"
									value="500"
								/>

								<SelectItem
									text="500-1000"
									value="1000"
								/>
								<SelectItem
									text="10000-10000"
									value="10000"
								/>
								<SelectItem
									text="more"
									value="more"
								/>
							</Select>
						</div> */}

						{/* <div className='formRow hidden'>
							<TextInput
								id="url"
								name="url"
								labelText="URL (optional):"
								placeholder="https://acme.com"
								value={values?.url || ''}
								onChange={(e) => handleChange(e.target.id, e.target.value)}
								invalid={!!errors.url}
								invalidText={errors.url}
							/>
						</div> */}

						<div className="formSection">{SECTION_HEADING_CUST_ADMIN}</div>
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
									labelText={LBL_EMAIL}
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
					<Button kind="secondary" form="customerForm" onClick={onCancelCallback}>
						{BTN_CANCEL}
					</Button>
					<Button kind="primary" type="submit" disabled={errors && Object.keys(errors).length > 0} form="customerForm">
						{BTN_ADD}
					</Button>
				</div>
			</S.Buttons>
		</S.CustomerDialog>
	);
};

export default CustomerDialog;
