/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import semverValid from 'semver/functions/valid';

export const validateCustomerInput = (values) => {
	const errors = {};
	const { billingId, label, firstName, lastName, email } = values;

	if (!billingId || billingId.trim().length === 0) {
		errors.billingId = 'Billing ID is required';
	}

	if (!label || label.trim().length === 0) {
		errors.label = 'Customer name is required';
	}

	if (!firstName || firstName.trim().length === 0) {
		errors.firstName = 'First name is required';
	}

	if (!lastName || lastName.trim().length === 0) {
		errors.lastName = 'Last name is required';
	}

	if (!email || email.trim().length === 0) {
		errors.email = 'Email address is required';
	} else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
		errors.email = 'Email address is invalid';
	}

	return errors;
};

export const validateOrganizationInput = (values) => {
	const errors = {};
	const { label } = values;

	if (!label || label.trim().length === 0) {
		errors.label = 'Customer name is required';
	}

	return errors;
};

export const validateUserInput = (values) => {
	const errors = {};

	if (!values.firstName) {
		errors.firstName = 'First name is required';
	}

	if (!values.lastName) {
		errors.lastName = 'Last name is required';
	}

	if (!values.email) {
		errors.email = 'Email address is required';
	} else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
		errors.email = 'Email address is invalid';
	}

	return errors;
};

export const validateCredentialInput = (values) => {
	const errors = {};
	const { name, config, expiresIn } = values;

	if (!name || name.trim().length === 0) {
		errors.name = 'Credential name is required';
	}

	if (!config) {
		errors.config = 'Configuration is required';
	}

	if (!expiresIn) {
		errors.expiresIn = 'Expires in value must be between 1 and 365';
	}

	return errors;
};

export const validateConfigInput = (values, originalValues) => {
	const errors = {};

	if (originalValues.customerId !== 'MASTER' && JSON.stringify(values) === JSON.stringify(originalValues)) {
		errors.name = 'This is a duplicate configuration.  You must modify at least 1 value.';
		errors.version = 'This is a duplicate configuration.  You must modify at least 1 value.';
	}

	const { name, version } = values;

	if (!name || name.trim().length === 0) {
		errors.name = 'Configuration name is required';
	} else if (name.trim().length > 120) {
		errors.name = 'Configuration name must be less than 120 characters';
	}

	if (version && !semverValid(version)) {
		errors.version = 'Configuration version must be in major.minor.patch format';
	}

	return errors;
};

export const validateVerifierConfigInput = (values, originalValues, configList = {}) => {
	const errors = {};
	const { name, saveType } = values;

	if (!name || name.trim().length === 0) {
		errors.name = 'Configuration name is required';
	} else if (name.trim().length > 120) {
		errors.name = 'Configuration name must be less than 120 characters';
	} else if (saveType === 'createCustConfig' && configList?.customerConfigList?.includes(name)) {
		errors.name = 'Configuration name already exists in the catalog';
	} else if (saveType === 'createMasterConfig' && configList?.masterConfigList?.includes(name)) {
		errors.name = 'Configuration name already exists in the master catalog';
	}

	return errors;
};
