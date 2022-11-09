/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { InlineNotification, Modal } from 'carbon-components-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CustomerDialog from '../../components/CustomerDialog/CustomerDialog';
import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';

import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import useToggle from '../../hooks/useToggle';
import useTranslateArrayValues from '../../hooks/useTranslateArrayValues';

import { addCustomer, addOrganization, addUser, deleteCustomer, getCustomers } from '../../services/dataService';
import { customerHeaders } from '../../services/tableHeaders';

import { ADMIN_PATH, CUST_PATH, METRICS_PATH, ORG_PATH } from '../../constants/paths';

import S from './CustomersPage.styles';

const CustomersPage = () => {
	const { logout } = useAuth();
	const { setCustConext, getAppContext, clearCustContext } = useAppContext();
	const [addOpen, setAddOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useToggle(false);
	const [refreshTime, setRefreshTime] = useState(Date.now());
	const [selectedRow, setSelectedRow] = useState();
	const [rows, setRows] = useState([]);
	const [error, setError] = useState({ heading: '', message: '' });

	const navigate = useNavigate();
	const { t } = useTranslation();
	const TABLE_TITLE = t('CUSTOMERS_PAGE:tblTitle');
	const TABLE_DESC = t('CUSTOMERS_PAGE:tblDescription');
	const TABLE_HELP = t('CUSTOMERS_PAGE:tableHelp');
	const BTN_NEW = t('CUSTOMERS_PAGE:btnNew');
	const PAGE_TITLE = t('CUSTOMERS_PAGE:PageTitle');

	const headers = useTranslateArrayValues({
		array: customerHeaders,
		arrayKeys: ['headers'],
		translationPage: 'CUSTOMERS_PAGE',
	});

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	// retreive customers, store in rows
	useEffect(() => {
		// console.log(getAppContext());

		getCustomers().then(
			(response) => {
				setRows(response?.data.reverse() || []);
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: CUST_PATH });
				}
			},
		);
	}, [refreshTime, getAppContext, clearCustContext, logout]);

	const onRowClickedHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setCustConext({ custId: row?.id, custName: row?.label });

				// navigate to the next page on the next turn of the event loop
				setTimeout(() => {
					navigate(ORG_PATH, { state: { returnPath: CUST_PATH } });
				}, 0);
			}
		},
		[navigate, setCustConext],
	);

	const onCreateHandler = useCallback(() => {
		setAddOpen(true);
	}, [setAddOpen]);

	const onDeleteHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setCustConext({ custId: row?.id, custName: row?.label });
				setDeleteOpen(true);
			}
		},
		[setDeleteOpen, setCustConext],
	);

	const onRefreshHandler = useCallback(() => {
		setRefreshTime(Date.now());
	}, [setRefreshTime]);

	const onShowAdminHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setCustConext({ custId: row?.id, custName: row?.label });
				setTimeout(() => {
					navigate(ADMIN_PATH, { state: { returnPath: CUST_PATH } });
				}, 0);
			}
		},
		[setSelectedRow, setCustConext, navigate],
	);

	const onUtilizationHandler = useCallback(
		(row) => {
			if (row) {
				setSelectedRow(row);
				setCustConext({ custId: row?.id, custName: row?.label });
				setTimeout(() => {
					navigate(METRICS_PATH, { state: { returnPath: CUST_PATH } });
				}, 0);
			}
		},
		[setSelectedRow, setCustConext, navigate],
	);

	const executeAdd = useCallback(
		async (customerData) => {
			setAddOpen(false);

			const { billingId, label, url, businessType, firstName, lastName, email } = customerData;

			try {
				const custData = {
					name: `customer_${Date.now()}`,
					label,
					url: url || '',
					businessType: businessType || 'Organization',
					billingId: billingId || '',
				};

				const addCustomerResponse = await addCustomer(custData);
				const { customerId } = addCustomerResponse.data;

				const id = `org_${Date.now()}`;

				const defaultOrgData = {
					name: id,
					label: `${label} Organization (default)`,
				};
				const addOrganizationResponse = await addOrganization(customerId, defaultOrgData);
				const { orgId } = addOrganizationResponse.data;

				await addUser({
					role: 'custadmin',
					firstName,
					lastName,
					email,
					customerId,
					customerName: label,
					orgId,
				});
			} catch (err) {
				if (err.status === 409) {
					setError({
						heading: 'Add Customer',
						message: `Customer named ${label} was created successfully, 
          however the Customer Administrator was not created because a user with email ${email} already exists.  
          You will need to manually add an administrator for ${label}.`,
					});
				} else if (err.status === 401 || err.status === 403) {
					logout({ redirect: CUST_PATH });
				} else {
					setError({
						heading: 'Add Customer',
						message: 'see logs for details',
					});
				}
			} finally {
				setRefreshTime(Date.now());
			}
		},
		[logout],
	);

	const executeDelete = useCallback(() => {
		if (!selectedRow) return;

		deleteCustomer(selectedRow.customerId).then(
			() => {
				const newRows = rows.filter((row) => row.id !== selectedRow.customerId);
				setRows(newRows);
				setSelectedRow();
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: CUST_PATH });
				} else {
					setError({
						heading: 'Delete Customer',
						message: 'see logs for details',
					});
					setRefreshTime(Date.now());
				}
			},
		);
	}, [rows, selectedRow, logout]);

	return (
		<S.CustomersPage id="customerPage">
			<div className="__auto_alerts">
				{error?.message && (
					<InlineNotification
						kind="error"
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

			<S.PageHeader className="__auto_breadcrumb_container">
				<PageHeader />
			</S.PageHeader>

			<S.Page id="customerListPage">
				<S.CustomerList className="customerListPage">
					<DataTable
						title={TABLE_TITLE}
						description={TABLE_DESC}
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

					{addOpen && <CustomerDialog open={addOpen} onCancelCallback={() => setAddOpen(false)} onSaveCallback={executeAdd} />}

					<Modal
						className="myModal"
						open={deleteOpen}
						danger
						modalHeading="Delete Customer"
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
				</S.CustomerList>
			</S.Page>
		</S.CustomersPage>
	);
};

export default CustomersPage;
