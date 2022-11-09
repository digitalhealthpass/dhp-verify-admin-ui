/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as translations from './translations';

export const defaultNS = 'COMMON';

// combine multiple languages from different components
export const resources = Object.values(translations).reduce((acc, module) => {
	Object.keys(module).forEach((key) => {
		if (acc[key]) {
			acc[key] = {
				...acc[key],
				...module[key],
			};
		} else {
			acc[key] = module[key];
		}
	});
	return acc;
}, {});

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		detection: {
			order: ['navigator'],
		},
		defaultNS,
		fallbackLng: 'en',
		debug: process.env.REACT_APP_I18N_DEBUG === 'true',
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		react: { bindI18n: 'languageChanged' },
		resources,
	});

export default i18n;
