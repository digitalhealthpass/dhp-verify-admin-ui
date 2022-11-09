/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useRef, useState, useEffect } from 'react';
import { TextInput, Button, Dropdown, NumberInput } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

import useForm from '../../hooks/useForm';
import { validateCredentialInput as validate } from '../../utils/formValidationRules';

import S from './CreateCredentialPage.styles';

const CreateCredentialPage = ({ configData, data, onSaveCallback }) => {
	const { values, handleChange, handleSubmit, errors } = useForm(data, onSaveCallback, validate);
	const btnRef = useRef();

	// const [refreshKey, setRefreshKey] = useState(1);

	// eslint-disable-next-line no-unused-vars
	const [_, setSelectedConfig] = useState();
	// const [selectedVersion, setSelectedVersion] = useState();
	// const [versions, setVersions] = useState([]);
	// const [useVersion, setUseVersion] = useState(false);

	// const versionDropdown = useRef()

	const { t } = useTranslation();
	const BTN_ADD = t('VERIFIER_DIALOG:btnAdd');
	const LBL_NAME = t('VERIFIER_DIALOG:lblName');
	const LBL_EXP = t('VERIFIER_DIALOG:lblExp');
	const LBL_CONFIG = t('VERIFIER_DIALOG:lblConfig');
	// const LBL_VERSION = t('VERIFIER_DIALOG:lblVersion');
	// const CKB_VERSION = t('VERIFIER_DIALOG:ckbVersion');
	const PLACEHOLDER_NAME = t('VERIFIER_DIALOG:placeHolder_name');
	const PLACEHOLDER_CONFIG = t('VERIFIER_DIALOG:placeHolder_config');
	const HELP_TEXT = t('VERIFIER_DIALOG:helpText');
	const PAGE_TITLE = t('VERIFIER_DIALOG:PageTitle');
	// const PLACEHOLDER_VERSION = t('VERIFIER_DIALOG:placeHolder_version');

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	const btnOnClick = (event) => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled');
		}
		handleSubmit(event);
		btnRef.current.removeAttribute('disabled');
	};

	const handleConfigChange = ({ selectedItem }) => {
		setSelectedConfig(selectedItem.id);
		// setUseVersion(false);
		// setRefreshKey(r => r + 1);
		// setVersions([{ id: "latest", name: "latest" }]);
	};

	// useEffect(() => {
	// 	if (selectedConfig && useVersion) {
	// 		const versionsArray = configData.filter((item) => item.id === selectedConfig)

	// 		if (versionsArray[0]?.versions) {
	// 			const versionOptions = versionsArray[0].versions.map((value) => {
	// 				return { id: value, name: value }
	// 			})

	// 			setVersions(versionOptions);
	// 		}
	// 	} else {
	// 		setRefreshKey(r => r + 1);
	// 		setVersions([{ id: "latest", name: "latest" }]);
	// 	}
	// }, [configData, selectedConfig, useVersion])

	return (
		<S.Page id="createCredentialPage">
			<S.Header>Create a verification credential</S.Header>
			<S.HelpText>{HELP_TEXT}</S.HelpText>
			<S.Content>
				<form id="verifierForm" onSubmit={btnOnClick}>
					<div className="formRow">
						<TextInput
							id="name"
							name="name"
							labelText={LBL_NAME}
							placeholder={PLACEHOLDER_NAME}
							value={values?.name || ''}
							onChange={(e) => handleChange(e.target.id, e.target.value)}
							invalid={!!errors.name}
							invalidText={errors.name}
						/>

						<NumberInput
							id="expiresIn"
							name="expiresIn"
							className="expiresIn"
							value={values.expiresIn}
							onChange={(e) => {
								handleChange('expiresIn', e.imaginaryTarget.value);
							}}
							max={365}
							min={1}
							label={LBL_EXP}
							invalid={!!errors.expiresIn}
							invalidText="Expires in value must be between 1 and 365"
						/>

						<S.Row>
							<Dropdown
								id="configs"
								name="config"
								className="configNames"
								titleText={LBL_CONFIG}
								label={PLACEHOLDER_CONFIG}
								items={configData}
								itemToString={(item) => (item ? item.name : '')}
								onChange={(e) => {
									handleConfigChange(e);
									handleChange('config', {
										id: e.selectedItem.id,
										name: e.selectedItem.name,
									});
								}}
								placeholder={PLACEHOLDER_CONFIG}
								direction="top"
							/>

							{/* <Dropdown
								id="versions"
								name="version"
								className="configVersions"
								key={refreshKey}
								ref={versionDropdown}
								titleText={LBL_VERSION}
								label={PLACEHOLDER_VERSION}
								items={versions}
								itemToString={(item) => (item ? item.name : '')}
								onClick={(e) => {
									setSelectedVersion(e.selectedItem.id)
								}}
								onChange={(e) => {
									handleChange("version", e.selectedItem.name);
								}}
								placeholder={PLACEHOLDER_VERSION}
								selectedItem={selectedVersion}
								disabled={!useVersion}
								direction="top"
							/> */}
						</S.Row>

						{/* <Checkbox
							id="useVersionCheckbox"
							className="versionCheckbox"
							checked={useVersion}
							labelText={CKB_VERSION}
							onChange={() => {
								setUseVersion(!useVersion)
								handleChange("version", selectedVersion);
							}}
							disabled={!selectedConfig}
						></Checkbox> */}
					</div>
				</form>
			</S.Content>

			<S.Buttons>
				<Button ref={btnRef} kind="primary" type="submit" disabled={errors && Object.keys(errors).length > 0} form="verifierForm">
					{BTN_ADD}
				</Button>
			</S.Buttons>
		</S.Page>
	);
};

export default CreateCredentialPage;
