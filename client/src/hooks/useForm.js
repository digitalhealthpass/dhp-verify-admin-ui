/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useState, useEffect, useRef } from 'react';

const useForm = (originalValues, callback, validate) => {
	const [values, setValues] = useState({ expiresIn: 1 });
	const [errors, setErrors] = useState({});
	const isSubmitting = useRef(false);
	const sent = useRef(false);

	useEffect(() => {
		if (originalValues) setValues(originalValues);
	}, [originalValues]);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting.current && !sent.current) {
			callback(values);
			isSubmitting.current = false;
			sent.current = true;
			setValues({});
		}
	}, [callback, errors, isSubmitting, values]);

	if (sent.current === true) {
		sent.current = false;
		setValues({});
		setErrors({});
	}

	const handleSubmit = (event, configList) => {
		if (event) event.preventDefault();
		setErrors(validate(values, originalValues, configList));
		isSubmitting.current = true;
	};

	const handleChange = (id, value, configList = {}) => {
		isSubmitting.current = false;
		const newValues = { ...values, [id]: value };
		setErrors(validate(newValues, originalValues, configList));
		setValues(() => newValues);
	};

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
	};
};

export default useForm;
