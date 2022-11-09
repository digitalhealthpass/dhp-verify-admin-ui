/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useState, useEffect, useCallback } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { Folder32, FolderOpen32, Rule32, CaretDown32, CaretRight32 } from '@carbon/icons-react';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdAddBox, MdIndeterminateCheckBox } from 'react-icons/md';

import { getCheckedValues, verifierConfigToTreeModel, treeModelToVerifierConfig } from '../../utils/configTreeMapper';

import S from './ConfigRulesEditor.styles';

const ICONS = {
	check: <MdCheckBox className="rct-icon rct-icon-check" style={{ verticalAlign: 'middle' }} />,
	uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" style={{ verticalAlign: 'middle' }} />,
	halfCheck: <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" style={{ verticalAlign: 'middle' }} />,
	expandClose: <CaretRight32 style={{ fill: 'black', verticalAlign: 'middle' }} />,
	expandOpen: <CaretDown32 style={{ fill: 'black', verticalAlign: 'middle' }} />,
	expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
	collapseAll: <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />,
	parentClose: <Folder32 style={{ fill: 'black', verticalAlign: 'middle' }} alt="folder" />,
	parentOpen: <FolderOpen32 style={{ fill: 'black', verticalAlign: 'middle' }} />,
	leaf: <Rule32 style={{ fill: 'black', verticalAlign: 'middle' }} />,
};

const ConfigRulesEditor = ({ verifierConfig, editable, onChangeCallback }) => {
	const [treeModel, setTreeModel] = useState();
	const [checked, setChecked] = useState();
	const [expanded, setExpanded] = useState([]);

	// whenever the verifierConfig input prop is modified gather the checked state and convert it to the treeModel
	useEffect(() => {
		if (verifierConfig) {
			const checkedValues = getCheckedValues(verifierConfig);
			setChecked(checkedValues);

			const currentTreeModel = verifierConfigToTreeModel(verifierConfig);
			setTreeModel(currentTreeModel);
		}
	}, [verifierConfig]);

	const onCheckHandler = useCallback(
		(newlyChecked) => {
			setChecked(newlyChecked);

			const currentDisabledState = treeModelToVerifierConfig(verifierConfig, newlyChecked);
			onChangeCallback(currentDisabledState);
		},
		[onChangeCallback, verifierConfig],
	);

	const onExpandHandler = useCallback((newlyExpanded) => {
		setExpanded(newlyExpanded);
	}, []);

	return (
		<div>
			{treeModel && (
				<S.Page id="configRulesEditor">
					<CheckboxTree
						id="configRulesEditorMainContent"
						checkModel="all"
						nodes={treeModel}
						checked={checked}
						expanded={expanded}
						onCheck={onCheckHandler}
						onExpand={onExpandHandler}
						icons={ICONS}
						noCascade
						disabled={!editable}
					/>
				</S.Page>
			)}
		</div>
	);
};

export default ConfigRulesEditor;
