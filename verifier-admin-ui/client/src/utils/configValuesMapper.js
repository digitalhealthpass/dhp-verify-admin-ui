/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import _ from 'lodash';

export const orderByNameProp = (array) => _.orderBy(array, ['name']);

const getVSNamesFromRule = (rule) => _.uniq(rule.predicate.match(/(?<=external.)(.*?)(?:(?![a-zA-Z-0-9\s]+))/g)); // extract a unique set of valueset names from the rule

export const vsToSpectMapping = (specificationConfigurations) =>
	specificationConfigurations.reduce((acc, config) => {
		config?.rules.forEach((rule) => {
			const valuesSetNamesInRule = getVSNamesFromRule(rule);
			valuesSetNamesInRule.forEach((vsName) => {
				const configName = `${config.credentialSpecDisplayValue} - ${config.credentialCategoryDisplayValue}`;

				if (acc[vsName]) {
					if (acc[vsName][configName]) {
						acc[vsName][configName] = [...acc[vsName][configName], rule.name];
					} else {
						acc[vsName][configName] = [rule.name];
					}
				} else {
					acc[vsName] = {
						[configName]: [rule.name],
					};
				}
			});
		});

		return acc;
	}, {});

export const connvertToDisplayName = (name) => {
	if (name) {
		return name
			.replace(/([A-Z,-])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase())
			.replace(/([A-Z])\s(?=[A-Z])/g, '$1');
	}
	return '';
};

// return the result of merging 2 object, ignoring any properties whose values are undefined
export const mergeObjects = (first, second) => {
	const response = {};

	Object.keys({
		...first,
		...second,
	}).map((key) => {
		const merged = second[key] || second[key] === '' ? second[key] : first[key];
		response[key] = merged;
		return response;
	});

	return response;
};
