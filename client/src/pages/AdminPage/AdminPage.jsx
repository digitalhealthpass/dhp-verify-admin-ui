/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */
import { InlineNotification } from 'carbon-components-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import useToggle from '../../hooks/useToggle';
import useTranslateArrayValues from '../../hooks/useTranslateArrayValues';

import { addUser, deleteUser, getUsers, resetUser } from '../../services/dataService';
import { userHeaders } from '../../services/tableHeaders';
import { changeRoleBySpan } from '../../utils/changeAtrribute';

import BackButton from '../../components/BackButton/BackButton';
import DataTable from '../../components/DataTable/DataTable';
import SaveUserDialog from '../../components/SaveUserDialog/SaveUserDialog';

import PageHeader from '../../components/PageHeader/PageHeader';
import { ADMIN_PATH, CUST_PATH, LANDING_PATH, ORG_PATH } from '../../constants/paths';
import S from './AdminPage.styles';

const Admin = () => {
	const { user, logout } = useAuth();
	const { getAppContext, clearCustContext, clearOrgContext } = useAppContext();
	const [addUserOpen, setAddUserOpen] = useToggle(false);
	const [refreshTime, setRefreshTime] = useState(Date.now());
	const [rows, setRows] = useState([]);
	const [error, setError] = useState({ heading: '', message: '', kind: '' });

	const [customerName, setCustomerName] = useState();
	const [customerId, setCustomerId] = useState();
	const [organizationId, setOrganizationId] = useState();
	const [organizationName, setOrganizationName] = useState();

	const navigate = useNavigate();
	const { state } = useLocation();
	const [returnPath] = useState(state?.returnPath);

	const { t } = useTranslation();
	const TABLE_TITLE = t('ADMINS_PAGE:tblTitle', {
		custName: organizationName || customerName,
	});
	const BTN_NEW = t('ADMINS_PAGE:btnNew');
	const TABLE_HELP = t('ADMINS_PAGE:tableHelp');

	const headers = useTranslateArrayValues({
		array: userHeaders,
		arrayKeys: ['headers'],
		translationPage: 'ADMINS_PAGE',
	});

	useEffect(() => {
		document.title = TABLE_TITLE;
		changeRoleBySpan();
	}, [TABLE_TITLE]);

	useEffect(() => {
		// console.log(getAppContext());
		const { custName, custId, orgId, orgName } = getAppContext();

		const cID = user.customerId || custId || -1;
		const cName = user.customerName || custName || undefined;
		const oID = user.orgId || orgId || -1;
		const oName = user.orgName || orgName || undefined;

		setCustomerId(cID);
		setCustomerName(cName);
		setOrganizationId(oID);
		setOrganizationName(oName);

		if (!cID || cID === -1) {
			navigate(LANDING_PATH);
		}

		const params = oID === -1 ? { custid: cID } : { custid: cID, orgid: oID };
		getUsers({ ...params }).then(
			(response) => {
				setRows(response?.data.reverse() || []);
			},
			(err) => {
				// eslint-disable-next-line no-console
				console.error(err);
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: ADMIN_PATH });
				}
			},
		);
	}, [refreshTime, getAppContext, navigate, logout, user]);

	const onAddUserHandler = useCallback(async () => {
		setAddUserOpen(true);
	}, [setAddUserOpen]);

	const onDeleteHandler = useCallback(
		(row) => {
			try {
				if (row?.id) {
					deleteUser({ data: { userId: row.id } }).then(() => {
						setRefreshTime(Date.now());
					});
				}
			} catch (err) {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: ADMIN_PATH });
				} else {
					setError({
						heading: 'Delete User',
						message: 'see logs for details',
						kind: 'error',
					});
				}
			}
		},
		[logout],
	);

	const onRefreshHandler = useCallback(() => {
		setRefreshTime(Date.now());
	}, []);

	const executeAddUser = useCallback(
		async (userData) => {
			setAddUserOpen(false);

			const { firstName, lastName, email } = userData;

			try {
				const newUser = organizationId
					? { role: 'orgadmin', firstName, lastName, email, customerId, customerName, orgId: organizationId, orgName: organizationName }
					: { role: 'custadmin', firstName, lastName, email, customerId, customerName };

				const { status, data } = await addUser(newUser);

				if (status === 200) {
					const { data: responseData } = data;
					if (!responseData.emailed) {
						setError({
							kind: 'warning',
							heading: 'Notification',
							message: `Please contact ${email} directly and advise them to check their email.  They should be receiving an email with a password reset link which is valid for 24 hours.`,
						});
					}
				}
			} catch (err) {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: ADMIN_PATH });
				} else if (err.status === 409) {
					setError({
						heading: 'Add Administrator',
						message: `User with email ${email} already exists.  You must provide a unique email address.`,
						kind: 'error',
					});
				} else {
					setError({
						heading: 'Add Administrator',
						message: 'see logs for details',
						kind: 'error',
					});
				}
			} finally {
				setRefreshTime(Date.now());
			}
		},
		[setAddUserOpen, customerName, customerId, organizationId, organizationName, logout],
	);

	const onResendEmailHandler = useCallback((row) => {
		if (row?.id) {
			resetUser({ userId: row.id });
		}
	}, []);

	const onBackHandler = useCallback(() => {
		if (returnPath === ORG_PATH) {
			clearOrgContext();
		}
		if (returnPath === CUST_PATH) {
			clearCustContext();
		}

		navigate(returnPath);
	}, [navigate, clearCustContext, clearOrgContext, returnPath]);

	return (
		<>
			<div className="__auto_alerts">
				{error?.message && (
					<InlineNotification
						kind={error.kind}
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

			<S.Page id="adminListPage" aria-label={TABLE_TITLE}>
				<PageHeader>
					<BackButton callback={onBackHandler} />
				</PageHeader>

				<DataTable
					title={TABLE_TITLE}
					addButtonTitle={BTN_NEW}
					rows={rows}
					headers={headers}
					helpText={TABLE_HELP}
					onCreateCallback={onAddUserHandler}
					onDeleteCallback={onDeleteHandler}
					onResendEmailCallback={onResendEmailHandler}
					onRefreshCallback={onRefreshHandler}
				/>

				{addUserOpen && <SaveUserDialog open={addUserOpen} onCancelCallback={() => setAddUserOpen(false)} onSaveCallback={executeAddUser} />}
			</S.Page>
		</>
	);
};

export default Admin;
