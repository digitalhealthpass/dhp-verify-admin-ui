/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useCallback, useState, useEffect, useRef } from 'react';
import { Modal, InlineNotification, Button } from 'carbon-components-react';
import { ChevronLeft32, Settings24 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import Credential from '../../components/Credential/Credential';
import PageHeader from '../../components/PageHeader/PageHeader';
import DataTable from '../../components/DataTable/DataTable';
import CreateCredentialPage from '../CreateCredentialPage/CreateCredentialPage';
import BackButton from '../../components/BackButton/BackButton';

import { useAuth } from '../../hooks/useAuth';
import useToggle from '../../hooks/useToggle';
import useTranslateArrayValues from '../../hooks/useTranslateArrayValues';

import { getVerifiers, deleteVerifier, getVerifier, addVerifier, getCustomerConfigs } from '../../services/dataService';
import { verifierHeaders } from '../../services/tableHeaders';

import { LANDING_PATH, VER_PATH, CONFIG_LIST_PATH, ORG_PATH } from '../../constants/paths';

import S from './CredentialListPage.styles';
import { changeRoleBySpan } from '../../utils/changeAtrribute';
import { useAppContext } from '../../hooks/useAppContext';

const CredentialListPage = () => {
	const { user, logout } = useAuth();
	const { getAppContext, clearOrgContext } = useAppContext();
	const [deleteOpen, setDeleteOpen] = useToggle(false);
	const [showOpen, setShowOpen] = useToggle(false);
	const [refreshTime, setRefreshTime] = useState(Date.now());
	const [selectedDeleteRow, setSelectedDeleteRow] = useState();
	const [credential, setCredential] = useState();
	const [rows, setRows] = useState([]);
	const successResponse = useRef();
	const [errorResponse, setErrorResponse] = useState();
	const credModalTitle = useRef();
	const [configData, setConfigData] = useState();
	const [showSidePanel, setShowSidePanel] = useState(false);
	const [showNeedConfigs, setShowNeedConfigs] = useState(false);
	const [showInvalidCredential, setShowInvalidCredential] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [customerName, setCustomerName] = useState();
	const [customerId, setCustomerId] = useState();
	const [organizationId, setOrganizationId] = useState();
	const [organizationName, setOrganizationName] = useState();

	const navigate = useNavigate();

	const { t } = useTranslation();
	const TABLE_TITLE = t('VERIFIERS_PAGE:tblTitle', {
		orgName: organizationName,
	});
	const BTN_NEW = t('VERIFIERS_PAGE:btnNew');
	const MODAL_HEADING_REVOKE = t('VERIFIERS_PAGE:modalHeadingRevoke');
	// const MODAL_HEADING_SHOW = t('VERIFIERS_PAGE:modalHeadingShow', { orgName: organizationName });
	const BTN_REVOKE = t('VERIFIERS_PAGE:btnRevoke');
	const BTN_CANCEL = t('VERIFIERS_PAGE:btnCancel');
	const BTN_CLOSE = t('VERIFIERS_PAGE:btnClose');
	const BTN_PRINT = t('VERIFIERS_PAGE:btnPrint');
	const REVOKE_ERROR = t('VERIFIERS_PAGE:errRevoke');
	const TABLE_HELP = t('VERIFIERS_PAGE:tableHelp');
	const MODAL_HEADER_NO_CONFIG = t('VERIFIERS_PAGE:noConfigHeader');
	const MODAL_BODY_NO_CONFIG = t('VERIFIERS_PAGE:noConfigBody');
	const MODAL_HEADER_INVALID_CREDENTIAL = t('VERIFIERS_PAGE:invalidCredentialHeader');
	const MODAL_BODY_INVALID_CREDENTIAL = t('VERIFIERS_PAGE:invalidCredentialBody');
	const MISSING_CONFIG = t('VERIFIERS_PAGE:missingConfig');
	const CONFIG_CAT = t('ORGS_PAGE:btnConfigCat');
	const BACK_LABEL = t('VERIFIERS_PAGE:backLabel');
	const PAGE_TITLE = t('VERIFIERS_PAGE:PageTitle');

	useEffect(() => {
		document.title = PAGE_TITLE;
		changeRoleBySpan();
	}, [PAGE_TITLE]);

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
		if (!oID || oID === -1) {
			navigate(ORG_PATH);
		}

		// get all of the Verifier Configurations
		getCustomerConfigs(cID, 'all').then(
			(verifierConfigurations) => {
				// get all of the Verifier Credentials
				getVerifiers(cID, oID).then(
					(verifierCredentials) => {
						const configurationData = verifierConfigurations?.data || [];
						const configurationIds = configurationData.map((data) => data?.id);

						let credentialsData = verifierCredentials?.data.reverse();
						credentialsData = credentialsData.map((data) => {
							// remove the latest from the credential id
							const credentialId = data?.configId?.replace(':latest', '');

							// if there is a reference in the Verifier Credential to
							// a Verifier Configuration we do not have in the list
							// set the status field to "missing configuration"
							if (!configurationIds.includes(credentialId)) {
								return { ...data, status: MISSING_CONFIG };
							}
							return data;
						});
						setRows(credentialsData || []);
					},
					(error) => {
						if (error.status === 401 || error.status === 403) {
							logout({ redirect: VER_PATH });
						}
					},
				);
			},
			(error) => {
				if (error.status === 401 || error.status === 403) {
					logout({ redirect: VER_PATH });
				}
			},
		);
	}, [navigate, logout, getAppContext, user, MISSING_CONFIG, refreshTime]);

	const headers = useTranslateArrayValues({
		array: verifierHeaders,
		arrayKeys: ['headers'],
		translationPage: 'VERIFIERS_PAGE',
	});

	const onRowClickedHandler = useCallback(
		async (row) => {
			if (!row) return;

			const { id, configId, status } = row;

			if (id && configId) {
				if (status === MISSING_CONFIG) {
					setShowInvalidCredential(true);
				} else {
					getVerifier(customerId, organizationId, id).then(
						(response) => {
							const { data } = response;
							if (data && row) {
								credModalTitle.current = t('VERIFIERS_PAGE:modalHeadingShow', {
									orgName: organizationName,
									label: row.label,
								});
								setCredential({
									verifiableCredential: data,
									verifierCredential: row,
								});
								setShowOpen(true);
							} else {
								setErrorResponse('Could not load credential.');
							}
						},
						(error) => {
							if (error.status === 401 || error.status === 403) {
								logout({ redirect: VER_PATH });
							}
						},
					);
				}
			} else {
				// TODO: check for missing id or configid  - this condition should not happen
			}
		},
		[MISSING_CONFIG, customerId, logout, organizationId, organizationName, setShowOpen, t],
	);

	const onCreateHandler = useCallback(() => {
		// fetch all valid configs for this customer
		getCustomerConfigs(customerId, 'all').then(
			({ data }) => {
				const newConfigData = data
					.filter((row) => row !== null)
					.reduce((acc, curr) => {
						const found = acc.find((x) => x.id === curr.id);
						if (found) {
							found.versions.push(curr.version);

							found.versions = found.versions
								.map((a) =>
									a
										.split('.')
										.map((n) => +n + 100000)
										.join('.'),
								)
								.sort()
								.map((a) =>
									a
										.split('.')
										.map((n) => +n - 100000)
										.join('.'),
								);
						} else {
							acc.push({
								id: curr.id,
								name: curr.name,
								versions: [curr.version],
							});
						}
						return acc;
					}, []);

				setConfigData(newConfigData);
				if (newConfigData && newConfigData.length > 0) {
					setShowSidePanel(true);
				} else {
					setShowNeedConfigs(true);
				}
			},
			(error) => {
				if (error.status === 401 || error.status === 403) {
					logout({ redirect: VER_PATH });
				}
				// eslint-disable-next-line no-console
				console.error(error);
			},
		);
	}, [customerId, logout]);

	const onRevokeHandler = useCallback(
		(row) => {
			setSelectedDeleteRow(row);
			setDeleteOpen(true);
		},
		[setSelectedDeleteRow, setDeleteOpen],
	);

	const onRefreshHandler = useCallback(() => {
		setRefreshTime(Date.now());
	}, []);

	const onBackHandler = useCallback(() => {
		clearOrgContext();
		navigate(ORG_PATH);
	}, [navigate, clearOrgContext]);

	const executeAdd = useCallback(
		async (formData) => {
			const { name, config, version = 'latest', expiresIn = '60' } = formData;
			const verifierData = {
				configId: `${config.id}:${version}`,
				configName: `${config.name}`,
				name: `${organizationId}_${Date.now()}`,
				label: name,
				daysTillExpiry: expiresIn,
				verifierType: 'VerifierCredential',
			};

			addVerifier(customerId, organizationId, verifierData).then(
				() => {
					setRefreshTime(Date.now());
					setShowSidePanel(false);
					successResponse.current = name;
				},
				(error) => {
					if (error.status === 401 || error.status === 403) {
						logout({ redirect: VER_PATH });
					}
				},
			);
		},
		[customerId, organizationId, logout],
	);

	const executeDelete = useCallback(async () => {
		if (!selectedDeleteRow) return;

		const { id, label } = selectedDeleteRow;

		deleteVerifier(customerId, organizationId, id).then(
			(response) => {
				const { status } = response;
				if (status === 200) {
					const newRows = rows.filter((row) => row.id !== id);
					setRows(newRows);
					setSelectedDeleteRow();
					successResponse.current = label;
				} else if (status === 500) {
					setErrorResponse(REVOKE_ERROR);
				}
			},
			(error) => {
				if (error.status === 401 || error.status === 403) {
					logout({ redirect: VER_PATH });
				}
				setErrorResponse(REVOKE_ERROR);
			},
		);
	}, [REVOKE_ERROR, customerId, organizationId, rows, selectedDeleteRow, logout]);

	const handlePrint = useReactToPrint({
		content: () => document.getElementById('qrCodePage'),
		onAfterPrint: () => setShowOpen(false),
	});

	return (
		<>
			<S.PageHeader id="credentialListPageHeader" show={!showSidePanel}>
				<PageHeader>
					{(user.isSysAdmin || user.isCustAdmin) && <BackButton text={BACK_LABEL} callback={onBackHandler} />}

					<nav id="configCatalogBtn" aria-label={CONFIG_CAT}>
						<Button kind="ghost" className="__auto_showCatalog" onClick={() => navigate(CONFIG_LIST_PATH, { state: { returnPath: VER_PATH } })} renderIcon={Settings24}>
							{CONFIG_CAT}
						</Button>
					</nav>
				</PageHeader>
			</S.PageHeader>

			<S.CredentialsPage id="credentialListPage">
				<S.Page>
					<S.CredList showPanel={showSidePanel} className="__auto_credList">
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

						<DataTable
							title={TABLE_TITLE}
							helpText={TABLE_HELP}
							addButtonTitle={BTN_NEW}
							rows={rows}
							headers={headers}
							onRowClickedCallback={onRowClickedHandler}
							onCreateCallback={onCreateHandler}
							onRevokeCallback={onRevokeHandler}
							onRefreshCallback={onRefreshHandler}
						/>
					</S.CredList>

					{configData && showSidePanel && (
						<S.SidePanel showPanel={showSidePanel} className="__auto_sidePanel">
							<S.BackNav aria-label="go back" className="__auto_backNav">
								<Button
									kind="ghost"
									onClick={() => {
										setShowSidePanel(false);
									}}
									hasIconOnly
									iconDescription="Back"
									renderIcon={ChevronLeft32}
								/>
							</S.BackNav>

							<CreateCredentialPage configData={configData} onSaveCallback={executeAdd} />
						</S.SidePanel>
					)}
				</S.Page>
			</S.CredentialsPage>

			{/* Delete confirmation modal */}
			<Modal
				open={deleteOpen}
				danger
				modalHeading={MODAL_HEADING_REVOKE}
				primaryButtonText={BTN_REVOKE}
				secondaryButtonText={BTN_CANCEL}
				onRequestSubmit={() => {
					setDeleteOpen(false);
					executeDelete();
				}}
				onRequestClose={setDeleteOpen}
			>
				<div className="modalText">
					{t('VERIFIERS_PAGE:modalText', {
						credName: selectedDeleteRow?.label || '',
					})}
				</div>
			</Modal>

			{/* Show selected VC modal */}
			<section id="credentialSection" aria-label={credModalTitle.current}>
				<Modal
					id="credentialModal"
					open={showOpen}
					size="lg"
					modalHeading={credModalTitle.current}
					primaryButtonText={BTN_PRINT}
					secondaryButtonText={BTN_CLOSE}
					onRequestSubmit={handlePrint}
					onRequestClose={() => {
						setShowOpen(false);
					}}
				>
					{showOpen && credential && <Credential credData={credential} />}
				</Modal>
			</section>

			{/* Show create config Modal */}
			<Modal
				passiveModal
				size="xs"
				open={showNeedConfigs}
				modalHeading={MODAL_HEADER_NO_CONFIG}
				onRequestClose={() => {
					setShowNeedConfigs(false);
				}}
			>
				<div className="modalText">{MODAL_BODY_NO_CONFIG}.</div>
			</Modal>

			<Modal
				danger
				size="xs"
				open={showInvalidCredential}
				modalHeading={MODAL_HEADER_INVALID_CREDENTIAL}
				primaryButtonText={BTN_REVOKE}
				secondaryButtonText={BTN_CANCEL}
				onRequestSubmit={() => {
					setShowInvalidCredential(false);
					executeDelete();
				}}
				onRequestClose={() => {
					setShowInvalidCredential(false);
				}}
			>
				<div className="modalText">{MODAL_BODY_INVALID_CREDENTIAL}.</div>
			</Modal>
		</>
	);
};

export default CredentialListPage;
