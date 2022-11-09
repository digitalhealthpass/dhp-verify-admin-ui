/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */

import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Tab, Tabs, ToastNotification } from 'carbon-components-react';

import { CONFIG_LIST_PATH, LANDING_PATH } from '../../constants/paths';
import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import { addConfigToProfile, createConfig, createValueSet, getConfig, getCustomerConfigs, getMasterConfigs } from '../../services/dataService';
import { incrementVersion } from '../../utils/index';

import BackButton from '../../components/BackButton/BackButton';
import ConfigRulesEditor from '../../components/ConfigRulesEditor/ConfigRulesEditor';
import ConfigValuesEditor from '../../components/ConfigValuesEditor/ConfigValuesEditor';
import NavigationConfirmDialog from '../../components/NavigationConfirmDialog/NavigationConfirmDialog';
import PageHeader from '../../components/PageHeader/PageHeader';
import SaveVerifierConfigDialog from '../../components/SaveVerifierConfigDialog/SaveVerifierConfigDialog';
import useCallbackPrompt from '../../hooks/useCallBackPrompt';

import S from './VerifierConfigDetailPage.styles';

const TOAST_INITIAL_STATE = {
	show: false,
	options: {},
};

const VerifierConfigDetailsPage = () => {
	const { user, logout } = useAuth();
	const { getAppContext } = useAppContext();
	const navigate = useNavigate();
	const { state } = useLocation();

	const [openSaveDialog, setOpenSaveDialog] = useState(false);
	const [showToastNotification, setShowToastNotification] = useState(TOAST_INITIAL_STATE);

	const [configLists, setConfigLists] = useState();

	const [showDialog, setShowDialog] = useState(false);
	const [showPrompt, confirmNavigationCallback, cancelNavigationCallback] = useCallbackPrompt(showDialog);

	const { id, version, name } = state || {};
	const [localVerifierConfig, setLocalVerifierConfig] = useState();
	const [customerId, setCustomerId] = useState();
	const [error, setError] = useState();
	const valueSetChanges = useRef({});
	const disabledChanges = useRef({});

	const { t } = useTranslation();
	const CONFIG_RULES = t('VERIFIER_CONFIG_DETAILS_PAGE:configRulesTab');
	const CONFIG_VALUES = t('VERIFIER_CONFIG_DETAILS_PAGE:configValuesTab');
	const ERR_TITLE = t('VERIFIER_CONFIG_DETAILS_PAGE:errNotFoundTitle');
	const ERR_BODY = t('VERIFIER_CONFIG_DETAILS_PAGE:errNotFoundBody');
	const BACK_BTN = t('VERIFIER_CONFIG_DETAILS_PAGE:backBtnText');
	const BTN_SAVE = t('VERIFIER_CONFIG_DETAILS_PAGE:saveBtnText');
	const CONFIG_CREATE_SUCCESS = t('VERIFIER_CONFIG_DETAILS_PAGE:configCreateSuccess');
	const CONFIG_CREATE_ERROR = t('VERIFIER_CONFIG_DETAILS_PAGE:configCreateError');

	useEffect(() => {
		const { custId } = getAppContext();
		const derivedCustomerId = user.customerId || custId || -1;

		if (!derivedCustomerId || derivedCustomerId === -1) {
			navigate(LANDING_PATH);
		} else {
			setCustomerId(derivedCustomerId);
			getConfig(derivedCustomerId, id, version).then(
				(response) => {
					setLocalVerifierConfig(response.data);
				},
				() => {
					navigate(LANDING_PATH);
				},
			);
		}
	}, [id, version, getAppContext, navigate, user]);

	const onRuleChangeHandler = useCallback((changes) => {
		disabledChanges.current = changes;
		setShowDialog(true);
		// console.log(disabledChanges.current);
	}, []);

	const onValueSetChangeHandler = useCallback(
		(changes) => {
			const modifiableChanges = { ...changes };
			delete modifiableChanges.id;

			const originalName = localVerifierConfig.expanded.valueSets.find((valueSet) => valueSet.id === changes.id).name;
			modifiableChanges.name = originalName;

			valueSetChanges.current[id] = modifiableChanges;
			setShowDialog(true);

			// console.log(valueSetChanges.current);
		},
		[localVerifierConfig],
	);

	const onSaveHandler = useCallback(async () => {
		const configList = {};

		if (user.isSysAdmin) {
			const masterConfigsResponse = await getMasterConfigs();
			configList.masterConfigList = masterConfigsResponse?.data?.map((config) => config?.name || '') ?? [];
		}

		const customerConfigsResponse = await getCustomerConfigs(customerId, 'latest');
		configList.customerConfigList = customerConfigsResponse?.data?.map((config) => config?.name || '') ?? [];

		setConfigLists(configList);
		setOpenSaveDialog(true);
	}, [customerId, user.isSysAdmin]);

	const processChangedValueSets = useCallback(
		async (changedValueSets) => {
			// Step 0: if there are no changedValueSets, then return an object with the existing valueSets array
			if (_.isEmpty(changedValueSets)) {
				return { valueSets: localVerifierConfig.reference.valueSets };
			}

			const currentValueSets = {};

			// Step 1: iterate over each changedValueSet
			await Promise.all(
				Object.keys(changedValueSets).map(async (originalId) => {
					const valueSetToCreate = changedValueSets[originalId];

					// Step 2: create a new valueSet
					const newValueSetResponse = await createValueSet(valueSetToCreate);
					const { data, status } = newValueSetResponse;

					if (data && status) {
						// Step 3: validate the response
						if (status !== 201 || !data.id || !data.version) {
							// TODO: Failed to create new valueSet
							return;
						}

						// Step 4: update the specific old valueSet id and version with the new valueSet id and version
						currentValueSets.valueSets = localVerifierConfig.reference.valueSets.map((valueSetItem) => (valueSetItem.id === originalId ? { id: data.id, version: data.version } : valueSetItem));
					}
				}),
			);

			return currentValueSets;
		},
		[localVerifierConfig],
	);

	const executeSave = useCallback(
		async (saveDialogValues) => {
			try {
				// console.log(saveDialogValues);
				setOpenSaveDialog(false);
				const { name: saveName, receiveUpdates, saveType } = saveDialogValues;

				// Step 1: convert the reported valueSet changes into a updated list of valueSets (creatings new valueSets and updates the references)
				const modifiedValueSets = await processChangedValueSets(valueSetChanges.current);
				const configToSave = {
					...localVerifierConfig.reference,
					...disabledChanges.current,
					...modifiedValueSets,
				};

				delete configToSave.created_at;
				delete configToSave.created_by;
				delete configToSave.updated_at;

				// Step 2: based on the save selections modify the appropriate values in configToSave
				if (saveType.startsWith('update')) {
					configToSave.version = incrementVersion(localVerifierConfig.reference.version, 'patch');
				} else {
					delete configToSave.id;
					configToSave.name = saveName;
				}

				if (saveType.endsWith('MasterConfig')) {
					configToSave.masterCatalog = true;
				} else {
					configToSave.masterCatalog = false;
				}

				// Step3: If the user unselects the Receive updates checkbox on the save dialog, freeze the versions to the current versions (extracted from expanded)
				if (!receiveUpdates) {
					configToSave.specificationConfigurations = localVerifierConfig.expanded.specificationConfigurations.map((specConfig) => ({
						id: specConfig.id,
						version: specConfig.version,
					}));
				}

				// console.log(configToSave);

				// Step 4: create the configuration
				const setConfigResponse = await createConfig(customerId, configToSave);
				const { data, status } = setConfigResponse;

				if (status === 201) {
					if (!configToSave.masterCatalog) {
						// Step 5: add the profile to or customer profile
						const configToAddToProfile = {
							// profileId: customerId,
							configId: data.id,
							version: configToSave.version,
							updatedBy: user.userId,
						};

						await addConfigToProfile(customerId, configToAddToProfile);
					}

					// Step 6: notify user of success/failure
					if (setConfigResponse.status === 201) {
						setShowDialog(false);

						setShowToastNotification({
							show: true,
							options: {
								kind: 'success',
								title: CONFIG_CREATE_SUCCESS,
								// subtitle: 'Success subtitle',
								hideCloseButton: true,
								timeout: 5000,
							},
						});
					} else {
						setShowToastNotification({
							show: true,
							options: {
								kind: 'error',
								title: CONFIG_CREATE_ERROR,
								// subtitle: 'Error subtitle',
								hideCloseButton: false,
								timeout: 0,
							},
						});
					}
				} else {
					setShowToastNotification({
						show: true,
						options: {
							kind: 'error',
							title: CONFIG_CREATE_ERROR,
							// subtitle: 'Error subtitle',
							hideCloseButton: false,
							timeout: 0,
						},
					});
				}
			} catch (err) {
				if (err.status === 401 || err.status === 403) {
					setShowToastNotification({
						show: true,
						options: {
							kind: 'error',
							title: CONFIG_CREATE_ERROR,
							subtitle: error.statusText,
							hideCloseButton: false,
							timeout: 0,
						},
					});

					setTimeout(() => {
						logout({ redirect: LANDING_PATH });
					}, 10000);
				}
			} finally {
				valueSetChanges.current = {}; // once these are written, they can be cleared
				// disabledChanges.current = {};		// the disabled changes always remains the unchecked values
			}
		},
		[localVerifierConfig, logout, customerId, user, processChangedValueSets, setShowToastNotification, CONFIG_CREATE_SUCCESS, CONFIG_CREATE_ERROR],
	);

	const onBackHandler = useCallback(() => {
		navigate(CONFIG_LIST_PATH, { state: { ...state } });
	}, [navigate, state]);

	const onSaveErrorHandler = useCallback((err) => {
		// TODO: Test Me!
		setError(err);
	}, []);

	const onToastClosedHandler = useCallback(() => {
		setShowToastNotification(TOAST_INITIAL_STATE);
	}, []);

	const onSaveCancelHandler = useCallback(() => {
		setOpenSaveDialog(false);
	}, []);

	return (
		<>
			<NavigationConfirmDialog showDialog={showPrompt} confirmNavigationCallback={confirmNavigationCallback} cancelNavigationCallback={cancelNavigationCallback} />
			{showToastNotification.show && <ToastNotification {...showToastNotification.options} onClose={onToastClosedHandler} />}

			<S.Page id="configDetailPage">
				<PageHeader>
					<BackButton text={BACK_BTN} callback={onBackHandler} />
				</PageHeader>

				{error && error === 404 && (
					<S.ErrorContent id="configDetailError">
						<S.Title>{ERR_TITLE}</S.Title>
						<S.Body>{ERR_BODY}</S.Body>
					</S.ErrorContent>
				)}

				{!error && localVerifierConfig && (
					<S.MainContent id="configDetails">
						<S.PageHeader>
							<S.Title>
								{name} - {version}
							</S.Title>
							{(localVerifierConfig.reference.masterCatalog || user.isSysAdmin) && (
								<Button kind="primary" form="verifierConfigDetailsForm" type="submit" onClick={onSaveHandler}>
									{BTN_SAVE}
								</Button>
							)}
						</S.PageHeader>
						<Tabs type="container">
							<Tab id={CONFIG_RULES} label={CONFIG_RULES}>
								<ConfigRulesEditor verifierConfig={localVerifierConfig} editable={user.isSysAdmin} onChangeCallback={onRuleChangeHandler} />
							</Tab>
							<Tab id={CONFIG_VALUES} label={CONFIG_VALUES}>
								<ConfigValuesEditor verifierConfig={localVerifierConfig} editable={user.isSysAdmin} onChangeCallback={onValueSetChangeHandler} />
							</Tab>
						</Tabs>
					</S.MainContent>
				)}

				{openSaveDialog && (
					<SaveVerifierConfigDialog
						open={openSaveDialog}
						canSaveToMaster={user.isSysAdmin && localVerifierConfig.reference.masterCatalog}
						canModifyCustConfig={!localVerifierConfig.reference.masterCatalog}
						data={{
							saveType: 'createCustConfig',
							receiveUpdates: true,
							name: localVerifierConfig.expanded.name,
						}}
						serverError={onSaveErrorHandler}
						onCancelCallback={onSaveCancelHandler}
						onSaveCallback={executeSave}
						configList={configLists}
						invalidRules={disabledChanges.current.invalidRules}
					/>
				)}
			</S.Page>
		</>
	);
};

export default VerifierConfigDetailsPage;
