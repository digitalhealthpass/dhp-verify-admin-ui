/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Add16 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';

import { CONFIG_DETAIL_PATH, CONFIG_LIST_PATH, LANDING_PATH } from '../../constants/paths';
import { createConfig, getConfig } from '../../services/dataService';

import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';

import { convertCacheForDisplay, convertCacheForSave } from '../../utils/transforms';

import SaveConfigDialog from '../../components/SaveConfigDialog/SaveConfigDialog';
import ConfigCredType from './ConfigCredType';
import ConfigHeader from './ConfigHeader';
import ConfigMain from './ConfigMain';

import BackButton from '../../components/BackButton/BackButton';
import S from './ConfigDetailPage.styles';

const convertToLongName = (shortName) => {
	switch (shortName) {
		case 'IDHP':
			return 'Digital Health Pass';
		case 'GHP':
			return 'Good Health Pass';
		case 'SHC':
			return 'Smart Health Card';
		case 'DCC':
			return 'Digital Covid Certificate';
		case 'VC':
			return 'Verifiable Credential';
		default:
			return shortName;
	}
};

const ConfigDetailPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { user, logout } = useAuth();
	const { getAppContext } = useAppContext();

	const [config, setConfig] = useState();
	const [header, setHeader] = useState();
	const [cache, setCache] = useState();
	const [credTypes, setCredTypes] = useState();
	const [currCredType, setCurrCredType] = useState();
	const [currConfig, setCurrConfig] = useState();
	const [showSaveAs, setShowSaveAs] = useState();
	const [pageTitle, setPageTitle] = useState();
	const [createError, setCreateError] = useState();
	const [error, setError] = useState();

	const { custId, custName } = getAppContext();

	const cID = user.customerId || custId;
	const cName = user.customerName || custName;
	const canCreateNew = user.isCustAdmin;

	const { t } = useTranslation();
	const NAME = t('CONFIG_DETAILS_PAGE:lblConfigName');
	const VERSION = t('CONFIG_DETAILS_PAGE:lblConfigVersion');
	const PUBLISHER = t('CONFIG_DETAILS_PAGE:lblConfigPublisher');
	const CACHE = t('CONFIG_DETAILS_PAGE:lblConfigCache');
	const REFRESH = t('CONFIG_DETAILS_PAGE:lblConfigRefresh');
	const BTN_SAVE = t('CONFIG_DETAILS_PAGE:btnSave');
	const ERR_TITLE = t('CONFIG_DETAILS_PAGE:errNotFoundTitle');
	const ERR_BODY = t('CONFIG_DETAILS_PAGE:errNotFoundBody');
	const ADD_CONFIG = t('CONFIG_DETAILS_PAGE:addConfig');
	const BTN_BACK = t('CONFIG_DETAILS_PAGE:btnBack');

	useEffect(() => {
		if (!cID || cID === -1) {
			navigate(LANDING_PATH);
			return;
		}

		// if deep-linked, we can't determine where to go back, so go to landing page.
		if (!state) {
			navigate(LANDING_PATH);
		}
	});

	const credTypeChangedHandler = useCallback((credType) => {
		setCurrCredType(credType);
	}, []);

	const onBackHandler = useCallback(() => {
		navigate(CONFIG_LIST_PATH, { state: { ...state } });
	}, [navigate, state]);

	useEffect(() => {
		if (config) {
			const { name, version, offline, refresh, configuration } = config.expanded;

			const newHeader = [
				{ name: NAME, value: `${name} @ ${version}` },
				// { name: VERSION, value: version },
				// { name: PUBLISHER, value: label }
			];

			const newCache = [{ name: CACHE, value: `${offline}` }];

			if (offline === true) {
				cache.push({ name: REFRESH, value: convertCacheForDisplay(refresh) });
			}

			const newCredTypes = Object.keys(configuration).map((c) => {
				const longName = convertToLongName(c);
				return { name: longName, value: c };
			});

			setHeader(newHeader);
			setCache(convertCacheForDisplay(newCache));
			setCredTypes(newCredTypes);
		}
	}, [CACHE, NAME, PUBLISHER, REFRESH, VERSION, config]);

	useEffect(() => {
		if (state) {
			const { id, version, title } = state;

			if (title) {
				const expandedTitle = t('CONFIG_DETAILS_PAGE:pageTitle', { title });
				setPageTitle(expandedTitle);
				document.title = expandedTitle;
			}

			getConfig(cID, id, version).then(
				(response) => {
					const { status, data } = response;
					if (status === 200) {
						setConfig(data);
					} else {
						// eslint-disable-next-line no-console
						console.error('get config failed');
					}
				},
				(err) => {
					if (err.status === 401 || err.status === 403) {
						logout({ redirect: CONFIG_DETAIL_PATH });
					} else {
						setError(err.status);
					}
				},
			);
		}
	}, [cID, navigate, state, logout, t]);

	useEffect(() => {
		if (config?.expanded?.configuration) {
			if (currCredType) {
				const newConfig = config.expanded.configuration[currCredType];
				setCurrConfig(newConfig);
			} else {
				const defaultCredType = Object.keys(config.expanded.configuration)[0];
				const newConfig = config.expanded.configuration[defaultCredType];
				setCurrCredType(defaultCredType);
				setCurrConfig(newConfig);
			}
		}
	}, [config, currCredType]);

	const executeSave = useCallback(
		async (options) => {
			const modifiedConfig = { ...options };
			// delete these properties from the original configuration (not needed on save as)
			delete modifiedConfig.id;
			delete modifiedConfig.created_at;
			delete modifiedConfig.created_by;
			delete modifiedConfig.updated_at;

			// update these properties from the orginal configuration (this makes it customer specific)
			modifiedConfig.organizationId = '';
			modifiedConfig.organization = '';
			modifiedConfig.label = `${cName} Catalog`;
			modifiedConfig.customerId = cID;
			modifiedConfig.customer = cName;
			modifiedConfig.unrestricted = true;
			modifiedConfig.refresh = convertCacheForSave(modifiedConfig.refresh);

			try {
				const createResponse = await createConfig(cID, modifiedConfig);
				const { status } = createResponse;
				if (status === 201) {
					setShowSaveAs(false);
					onBackHandler({ tabIndex: 0 });
				}
			} catch (err) {
				if (err.status === 401 || err.status === 403) {
					logout({ redirect: CONFIG_DETAIL_PATH });
				}
				if (err.isAxiosError) {
					// eslint-disable-next-line no-console
					console.error(err.response.data);
					setCreateError(err.response.data);
				}
			}
		},
		[cID, cName, onBackHandler, logout],
	);

	return (
		<S.Page id="configDetailPage">
			<BackButton text={BTN_BACK} callback={onBackHandler} />

			{error && error === 404 && (
				<S.ErrorContent id="configDetailError">
					<S.Title>{ERR_TITLE}</S.Title>
					<S.Body>{ERR_BODY}</S.Body>
				</S.ErrorContent>
			)}

			{!error && header && cache && credTypes && config.expanded.configuration && (
				<S.MainContent id="configDetails">
					<S.PageHeader>
						<S.Title>{pageTitle}</S.Title>
						<ConfigHeader values={header} />
						{/* <ConfigCache values={cache} /> */}
					</S.PageHeader>

					<S.ConfigContent className="mainContent __auto_mainContent">
						<S.Col>
							<ConfigCredType values={credTypes} selectedValue={currCredType} onChangeCallback={credTypeChangedHandler} />
						</S.Col>
						<ConfigMain expandedName={convertToLongName(currCredType)} values={currConfig} />
					</S.ConfigContent>

					<S.ButtonArea className="__auto_buttonArea">
						<section aria-label={ADD_CONFIG}>
							{canCreateNew && config.expanded.customerId === 'MASTER' && (
								<Button className="__auto_saveAs" kind="primary" onClick={setShowSaveAs} renderIcon={Add16} iconDescription="Add">
									{BTN_SAVE}
								</Button>
							)}
						</section>
					</S.ButtonArea>
				</S.MainContent>
			)}

			{showSaveAs && (
				<SaveConfigDialog
					open={!!showSaveAs}
					data={config.expanded}
					serverError={createError}
					onCancelCallback={(value) => {
						setShowSaveAs(!value);
					}}
					onSaveCallback={executeSave}
				/>
			)}
		</S.Page>
	);
};

export default ConfigDetailPage;
