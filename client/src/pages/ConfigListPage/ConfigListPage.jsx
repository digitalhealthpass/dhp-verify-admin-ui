/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Button, InlineNotification, Tab, Tabs } from 'carbon-components-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import useTranslateArrayValues from '../../hooks/useTranslateArrayValues';
import { getCustomerConfigs, getMasterConfigs } from '../../services/dataService';

import BackButton from '../../components/BackButton/BackButton';
import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import { configHeaders } from '../../services/tableHeaders';

import { CONFIG_DETAIL_PATH, CONFIG_LIST_PATH, LANDING_PATH, VERIFIER_CONFIG_DETAIL_PATH } from '../../constants/paths';
import { filterUniqSortConfigList } from '../../utils';
import { changeRoleBySpan } from '../../utils/changeAtrribute';

import S from './ConfigListPage.styles';

const ConfigListPage = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const { state } = useLocation();
	const [returnPath] = useState(state?.returnPath);
	const { getAppContext } = useAppContext();

	const [rows, setRows] = useState();
	const [selectedRow] = useState();
	const [refreshTime, setRefreshTime] = useState(Date.now());
	// const [selectedDeleteRow, setSelectedDeleteRow] = useState();
	// const [deleteOpen, setDeleteOpen] = useState(false);
	const [errorResponse, setErrorResponse] = useState();
	const [tabIndex, setTabIndex] = useState(state?.tabIndex || 0);

	const { custId, custName } = getAppContext();

	const customerId = user.customerId || custId;
	const customerName = user.customerName || custName;

	const { t } = useTranslation();
	const PAGE_TITLE = t('CONFIG_LIST_PAGE:pageTitle');
	const HELP_TEXT = t('CONFIG_LIST_PAGE:helpText');
	// const MODAL_HEADING_DELETE = t('CONFIG_LIST_PAGE:modalHeadingDelete');
	// const BTN_DELETE = t('CONFIG_LIST_PAGE:btnDelete');
	// const BTN_CANCEL = t('CONFIG_LIST_PAGE:btnCancel');
	// const DELETE_ERROR = t('CONFIG_LIST_PAGE:errDelete');
	const TAB_MASTER = t('CONFIG_LIST_PAGE:tabMaster');
	const TAB_CUSTOMER = t('CONFIG_LIST_PAGE:tabCust', { name: customerName });
	const TITLE_MASTER = t('CONFIG_LIST_PAGE:tabMaster');
	const TITLE_CUSTOMER = t('CONFIG_LIST_PAGE:tabCust', { name: customerName });
	const MASTER_CATALOG = t('CONFIG_LIST_PAGE:masterCatalog');

	useEffect(() => {
		if (!customerId || customerId === -1) {
			navigate(LANDING_PATH);
		}
	});

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	useEffect(() => {
		changeRoleBySpan();
	}, []);

	useEffect(() => {
		if (selectedRow) {
			const { id: combinedIdVersion } = selectedRow;
			const title = tabIndex === 0 ? TITLE_CUSTOMER : TITLE_MASTER;

			const [id, version] = combinedIdVersion.split(':');

			if (id && version) {
				navigate(CONFIG_DETAIL_PATH, {
					state: { id, version, title, tabIndex, returnPath },
				});
			}
		}
	}, [selectedRow, TITLE_CUSTOMER, TITLE_MASTER, navigate, tabIndex, returnPath]);

	const headers = useTranslateArrayValues({
		array: configHeaders,
		arrayKeys: ['headers'],
		translationPage: 'CONFIG_LIST_PAGE',
	});

	if (user.isOrgAdmin && !user.isCustAdmin) {
		headers.splice(-1);
	}

	// const parseId = useCallback((inputId) => {
	// 	const tokens = inputId.split(':');
	// 	return {
	// 		id: tokens[0],
	// 		version: tokens[1],
	// 	};
	// }, []);

	useEffect(() => {
		const executeQuery = async () => {
			let response;
			if (tabIndex === 1) {
				response = await getMasterConfigs(customerId);
			} else {
				response = await getCustomerConfigs(customerId, 'latest');
			}

			return response;
		};

		executeQuery().then(
			(response) => {
				const { status, data } = response;
				if (status === 200) {
					const fetchedRows = data.map((config) => {
						if (config) {
							return {
								id: `${config?.id}:${config?.version}`,
								name: config.name,
								version: config.version,
								label: config.label,
								// offline: `${config.offline}`,
								// refresh: convertCacheForDisplay(config.refresh),
								// credTypes: Object.keys(config.configuration).join(', '),
								customerId: config.customerId,
								specificationConfigurations: config.specificationConfigurations,
								modified: config.updated_at,
								actions: '',
							};
						}
						return {};
					});
					// setRows(fetchedRows);
					setRows(filterUniqSortConfigList(fetchedRows));
				}
			},
			(error) => {
				if (error.status === 401 || error.status === 403) {
					logout({ redirect: CONFIG_LIST_PATH });
				}
			},
		);
	}, [tabIndex, refreshTime, customerId, logout]);

	const onRefreshHandler = useCallback(() => {
		setRefreshTime(Date.now());
	}, []);

	// const onDeleteHandler = useCallback(
	// 	(row) => {
	// 		setSelectedDeleteRow(row);
	// 		setDeleteOpen(true);
	// 	},
	// 	[setDeleteOpen, setSelectedDeleteRow]
	// );

	const onRowClickedHandler = useCallback(
		(row) => {
			if (row?.id) {
				const { id: combinedIdVersion, customerId: cID, name } = row;
				const title = tabIndex === 0 ? TITLE_CUSTOMER : TITLE_MASTER;
				const [id, version] = combinedIdVersion.split(':');

				if (id && version && cID) {
					// old configs have a customerId, new ones do not
					navigate(CONFIG_DETAIL_PATH, {
						state: { id, version, title, tabIndex, returnPath },
					});
				} else {
					navigate(VERIFIER_CONFIG_DETAIL_PATH, {
						state: { id, version, name, tabIndex, returnPath },
					});
				}
			}
		},
		[navigate, TITLE_CUSTOMER, TITLE_MASTER, returnPath, tabIndex],
	);

	// const executeDelete = async () => {
	// 	if (!selectedDeleteRow) return;

	// 	const { id: combinedID } = selectedDeleteRow;
	// 	const { id, version } = parseId(combinedID);
	// 	console.log(id);
	// 	console.log(version);

	// 	try {
	// 		const { status } = await deleteConfig(customerId, id, version);

	// 		if (status === 200) {
	// 			const newRows = rows.filter((row) => row.id !== combinedID);
	// 			setRows(newRows);
	// 			setSelectedDeleteRow();
	// 		} else {
	// 			if (status === 401 || status === 403) {
	// 				logout({ redirect: CONFIG_LIST_PATH });
	// 			}
	// 			if (status === 500) {
	// 				setErrorResponse(DELETE_ERROR);
	// 			}
	// 		}
	// 	} catch (e) {
	// 		setErrorResponse(DELETE_ERROR);
	// 	}
	// };

	const onBackHandler = useCallback(() => {
		if (returnPath) {
			navigate(returnPath, { state: { ...state } });
		} else {
			navigate(LANDING_PATH);
		}
	}, [navigate, returnPath, state]);

	return (
		<S.Page id="configListPage">
			{errorResponse && (
				<InlineNotification
					kind="error"
					role="alert"
					title="Error"
					lowContrast
					subtitle={errorResponse}
					onCloseButtonClick={() => {
						setErrorResponse(undefined);
					}}
				/>
			)}

			<PageHeader>
				<BackButton callback={onBackHandler} />
			</PageHeader>

			<S.MainContent id="configCatalogs">
				<S.PageTitle>{PAGE_TITLE}</S.PageTitle>
				<S.HelpText>{HELP_TEXT}</S.HelpText>

				<Tabs
					type="container"
					selected={tabIndex}
					scrollIntoView={false}
					onSelectionChange={(tIndex) => {
						setTabIndex(tIndex);
					}}
				>
					<Tab id="custConfig" label={TAB_CUSTOMER}>
						{rows && rows.length > 0 && (
							<DataTable
								rows={rows}
								headers={headers}
								onRowClickedCallback={onRowClickedHandler}
								// onDeleteCallback={onDeleteHandler}
								onRefreshCallback={onRefreshHandler}
								// TODO: was this required to fix accessibility?
								// title={'Configuration Catalog'}
							/>
						)}

						{rows && rows.length === 0 && user.isCustAdmin && (
							<S.NoData>
								<div id="noConfigsText">You have no available configurations.</div>
								<div id="noConfigsLink">
									Create a configuration from the
									<S.ConfigCatalog>
										<Button
											onClick={() => {
												setTabIndex(1);
											}}
										>
											{MASTER_CATALOG}.
										</Button>
									</S.ConfigCatalog>
								</div>
							</S.NoData>
						)}

						{rows && rows.length === 0 && user.isOrgAdmin && !user.isCustAdmin && (
							<S.NoData>
								<p>No verifier configurations available. Please contact your administrator.</p>
							</S.NoData>
						)}
					</Tab>

					{user.isCustAdmin && (
						<Tab
							// <Tab
							id="masterConfig"
							label={TAB_MASTER}
						>
							<DataTable
								rows={rows}
								headers={headers}
								onRowClickedCallback={onRowClickedHandler}
								onRefreshCallback={onRefreshHandler}
								// TODO: was this required to fix accessibility?
								// title={'Configuration Catalog'}
							/>
						</Tab>
					)}
				</Tabs>
			</S.MainContent>

			{/* Delete confirmation modal */}
			{/* <Modal
				open={deleteOpen}
				danger
				modalHeading={MODAL_HEADING_DELETE}
				primaryButtonText={BTN_DELETE}
				secondaryButtonText={BTN_CANCEL}
				onRequestSubmit={() => {
					setDeleteOpen(false);
					executeDelete();
				}}
				onRequestClose={() => {
					setDeleteOpen(false);
				}}>
				<div className="modalText">{t('CONFIG_LIST_PAGE:modalText', { configName: selectedDeleteRow?.name || '' })}</div>
			</Modal> */}
		</S.Page>
	);
};

export default ConfigListPage;
