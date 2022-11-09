/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useTranslation } from 'react-i18next';

const useTranslateArrayValues = ({ array, arrayKeys, translationPage }) => {
	const { t } = useTranslation();
	const translationKeys = array.map((item) => item.header);
	const translatedKeys = {};

	for (let i = 0; i < arrayKeys.length; i += 1) {
		for (let j = 0; j < translationKeys.length; j += 1) {
			translatedKeys[translationKeys[j]] = t(`${translationPage}:${arrayKeys[i]}.${translationKeys[j]}`);
		}
	}

	const translatedArray = array.map((item) => ({
		...item,
		header: translatedKeys[item.header],
	}));
	return translatedArray;
};

export default useTranslateArrayValues;
