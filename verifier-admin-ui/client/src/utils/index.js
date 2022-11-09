/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { intersection, orderBy } from 'lodash';

import semverInc from 'semver/functions/inc';

import semverMaxSatisfying from 'semver/ranges/max-satisfying';

const getAllowedRoutes = (routes, roles) =>
	routes.filter(({ permission }) => {
		if (!permission || !Array.isArray(permission) || permission.length === 0) return true;

		return intersection(permission, roles).length;
	});

export default getAllowedRoutes;

export const incrementVersion = (version, type) => {
	const newVersion = semverInc(version, type);
	return newVersion;
};

export const filterUniqSortConfigList = (configRows) => {
	if (configRows?.length === 0) {
		return [];
	}

	const uniqueIds = configRows.reduce((acc, row) => {
		if (row && row.id) {
			const id = row.id.slice(0, row.id.indexOf(':'));
			if (id && !acc.includes(id)) {
				acc.push(id);
			}
		}
		return acc;
	}, []);

	const uniqIdsWithVersion = uniqueIds.map((uniqId) => {
		const selectedIDRows = configRows.filter((row) => row.id && row.id.slice(0, row.id.indexOf(':')) === uniqId);

		const versions = selectedIDRows.map((row) => row.version);
		const maxVersion = semverMaxSatisfying(versions, '*');

		return `${uniqId}:${maxVersion}`;
	}, []);

	const uniqRows = configRows.filter((row) => uniqIdsWithVersion.includes(row.id));

	return orderBy(uniqRows, ['modified'], 'desc');
};

// Used in Data Table component to find if Verifier Credential expires in 30 days and set to Expires soon Status
export const checkExpiresSoon = (checkDate) => {
	const currentDate = new Date().toISOString();
	const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;
	const diffInMilliseconds = new Date(checkDate).getTime() - new Date(currentDate).getTime();
	const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS;
	return diffInDays < 30;
};
