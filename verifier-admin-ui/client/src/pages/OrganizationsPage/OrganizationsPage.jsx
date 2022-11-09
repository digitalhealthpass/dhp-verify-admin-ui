/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Settings24 } from '@carbon/icons-react';
import { Button, InlineNotification, Modal } from 'carbon-components-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BackButton from '../../components/BackButton/BackButton';
import DataTable from '../../components/DataTable/DataTable';
import OrganizationDialog from '../../components/OrganizationDialog/OrganizationDialog';
import PageHeader from '../../components/PageHeader/PageHeader';

import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import useToggle from '../../hooks/useToggle';
import useTranslateArrayValues from '../../hooks/useTranslateArrayValues';
import { addOrganization, deleteOrganization, getOrganizations } from '../../services/dataService';
import { organizationHeaders } from '../../services/tableHeaders';

import { ADMIN_PATH, CONFIG_LIST_PATH, CUST_PATH, LANDING_PATH, METRICS_PATH, ORG_PATH, VER_PATH } from '../../constants/paths';

import S from './OrganizationsPage.styles';

const OrganizationsPage = () => {
	const { user, logout } = useAuth();
	const { getAppContext, setOrgContext, clearCustContext } = useAppContext();
	const [addOpen, setAddOpen] = useToggle(false);
	const [deleteOpen, setDeleteOpen] = useToggle(false);
	const [refreshTime, setRefreshTime] = useState(Date.now());
	const [selectedRow, setSelectedRow] = useState();
	const [rows, setRows] = useState([]);
	const [error, setError] = useState({ heading: '', message: '' });

	const [customerName, setCustomerName] = useState();
	const [customerId, setCustomerId] = useState();
	// const [organizationId, setOrganizationId] = useState();
	// const [organizationName, setOrganizationName] = useState();

	const navigate = useNavigate();

	const { t } = useTranslation();
	const TABLE_TITLE = t('ORGS_PAGE:tblTitle', { custName: customerName });
	const BTN_NEW = t('ORGS_PAGE:btnNew');
	const TABLE_HELP = t('ORGS_PAGE:tableHelp');
	const CONFIG_CAT = t('ORGS_PAGE:btnConfigCat');
	const BACK_LABEL = t('ORGS_PAGE:backLabel');
	const PAGE_TITLE = t('ORGS_PAGE:PageTitle');

	const headers = useTranslateArrayValues({
		array: organizationHeaders,
		arrayKeys: ['headers'],
		translationPage: 'ORGS_PAGE',
	});

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	useEffect(() => {
		// console.log(getAppContext());
		const { custName, custId } = getAppContext();

		const cId = user.customerId || custId || -1;
		const cName = user.customerName || custName || undefined;

		setCustomerId(cId);
		setCustomerName(cName);

		if (!cId || cId === -1) {
			navigate(LANDING_PATH);
		}

		getOrganizations(cId).then(
			(response) => {
				setRows(response?.data.reverse() || []);
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: ORG_PATH });
				}
			},
		);
	}, [user, getAppContext, navigate, logout, refreshTime]);

	const onRowClickedHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setOrgContext({ orgId: row?.id, orgName: row?.label });

				setTimeout(() => {
					navigate(VER_PATH, { state: { returnPath: ORG_PATH } });
				}, 0);
			}
		},
		[navigate, setOrgContext],
	);

	const onCreateHandler = useCallback(() => {
		setAddOpen(true);
	}, [setAddOpen]);

	const onDeleteHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setOrgContext({ orgId: row?.id, orgName: row?.label });
				setDeleteOpen(true);
			}
		},
		[setDeleteOpen, setOrgContext],
	);

	const onRefreshHandler = useCallback(() => {
		setRefreshTime(Date.now());
	}, []);

	const onBackHandler = useCallback(() => {
		clearCustContext();
		navigate(CUST_PATH);
	}, [navigate, clearCustContext]);

	const onShowAdminHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setOrgContext({ orgId: row?.id, orgName: row?.label });
				setTimeout(() => {
					navigate(ADMIN_PATH, { state: { returnPath: ORG_PATH } });
				}, 0);
			}
		},
		[setSelectedRow, navigate, setOrgContext],
	);

	const onUtilizationHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setOrgContext({ orgId: row?.id, orgName: row?.label });
				setTimeout(() => {
					navigate(METRICS_PATH, { state: { returnPath: ORG_PATH } });
				}, 0);
			}
		},
		[setSelectedRow, navigate, setOrgContext],
	);

	const executeAdd = useCallback(
		async (organizationData) => {
			setAddOpen(false);

			try {
				const { label } = organizationData;
				const id = `org_${Date.now()}`;

				const orgData = {
					name: id,
					label,
				};

				await addOrganization(customerId, orgData);

				setRefreshTime(Date.now());
			} catch (err) {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: ORG_PATH });
				}
				setError({
					heading: 'Add Organization',
					message: 'see logs for details',
				});
			}
		},
		[setAddOpen, customerId, logout],
	);

	const executeDelete = useCallback(() => {
		if (!selectedRow) return;

		const oID = selectedRow.id;

		deleteOrganization(customerId, oID).then(
			() => {
				const newRows = rows.filter((row) => row.id !== oID);
				setRows(newRows);
				setSelectedRow();
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: VER_PATH });
				}
			},
		);
	}, [customerId, rows, selectedRow, logout]);

	return (
		<>
			<S.PageHeader id="organizationsPageHeader">
				<PageHeader>
					{user.isSysAdmin && <BackButton text={BACK_LABEL} callback={onBackHandler} />}

					<nav id="configCatalogBtn" aria-label={CONFIG_CAT}>
						<Button kind="ghost" className="__auto_showCatalog" onClick={() => navigate(CONFIG_LIST_PATH, { state: { returnPath: ORG_PATH } })} renderIcon={Settings24}>
							{CONFIG_CAT}
						</Button>
					</nav>
				</PageHeader>
			</S.PageHeader>

			<S.OrganizationsPage id="organizationsPage">
				<div className="__auto_alerts">
					{error?.message && (
						<InlineNotification
							kind={error.kind || 'error'}
							role="alert"
							title={error.heading}
							lowContrast
							subtitle={error.message}
							onCloseButtonClick={() => {
								setError();
							}}
						/>
					)}
				</div>

				<S.Page id="organizationPage">
					<S.OrgList>
						<DataTable
							title={TABLE_TITLE}
							helpText={TABLE_HELP}
							addButtonTitle={BTN_NEW}
							rows={rows}
							headers={headers}
							onRowClickedCallback={onRowClickedHandler}
							onCreateCallback={onCreateHandler}
							onDeleteCallback={onDeleteHandler}
							onRefreshCallback={onRefreshHandler}
							onShowAdminsCallback={onShowAdminHandler}
							onUtilizationCallback={onUtilizationHandler}
						/>

						{addOpen && <OrganizationDialog open={addOpen} onCancelCallback={() => setAddOpen(false)} onSaveCallback={executeAdd} />}

						<Modal
							open={deleteOpen}
							danger
							modalHeading="Delete Organization"
							primaryButtonText="Delete"
							secondaryButtonText="Cancel"
							onRequestSubmit={() => {
								setDeleteOpen(false);
								executeDelete();
							}}
							onRequestClose={setDeleteOpen}
						>
							<div className="modalText">{`Are you sure you want to delete ${selectedRow?.label || ''}?`}</div>
						</Modal>
					</S.OrgList>
				</S.Page>
			</S.OrganizationsPage>
		</>
	);
};

export default OrganizationsPage;
