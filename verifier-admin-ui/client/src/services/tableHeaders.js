/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

export const customerHeaders = [
	{ header: 'ID', key: 'id' },
	{ header: 'Customer', key: 'label' },
	// { header: 'Business Type', key: 'businessType' },
	// { header: 'Status', key: 'status' },
	{ header: 'Actions', key: 'actions' },
];

export const organizationHeaders = [
	{ header: 'ID', key: 'id' },
	{ header: 'Organization', key: 'label' },
	{ header: 'Actions', key: 'actions' },
];

export const verifierHeaders = [
	{ header: 'Configuration ID', key: 'configId' },
	{ header: 'ID', key: 'id' },
	{ header: 'Name', key: 'label' },
	{ header: 'Configuration', key: 'configName' },
	{ header: 'Status', key: 'status' },
	{ header: 'Expiration', key: 'expirationDate' },
	{ header: 'Actions', key: 'actions' },
];

export const userHeaders = [
	{ header: 'ID', key: 'id' },
	{ header: 'Name', key: 'displayName' },
	{ header: 'Email', key: 'userName' },
	{ header: 'Actions', key: 'actions' },
];

export const configHeaders = [
	{ header: 'ID', key: 'id' },
	{ header: 'Name', key: 'name' },
	{ header: 'Version', key: 'version' },
	// { header: 'Publisher', key: 'label' },
	// { header: 'Cache', key: 'offline' },
	// { header: 'Cache Refresh', key: 'refresh' },
	// { header: 'Supported Credentials', key: 'credTypes' },
	{ header: 'Last Modified', key: 'modified' },
	{ header: 'Actions', key: 'actions' },
];
