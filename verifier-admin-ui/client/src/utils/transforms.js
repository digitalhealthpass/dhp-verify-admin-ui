/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const DAILY = 'daily';
const WEEKLY = 'weekly';
const MONTHLY = 'monthly';

export const DAILY_MS = 86400;
export const WEEKLY_MS = 604800;
export const MONTHLY_MS = 2592000;

export const convertCacheForSave = (value) => {
	switch (value) {
		case DAILY:
			return DAILY_MS;
		case WEEKLY:
			return WEEKLY_MS;
		case MONTHLY:
			return MONTHLY_MS;
		default:
			return value;
	}
};

export const convertCacheForDisplay = (value) => {
	switch (value) {
		case DAILY_MS:
			return DAILY;
		case WEEKLY_MS:
			return WEEKLY;
		case MONTHLY_MS:
			return MONTHLY;
		default:
			return value;
	}
};
