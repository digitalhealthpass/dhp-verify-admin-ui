/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { SideNavItems } from 'carbon-components-react';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import ValueSetItemDetail from './ValueSetItemDetail';
import ValueSetListItem from './ValueSetListItem';

import { connvertToDisplayName, orderByNameProp, vsToSpectMapping } from '../../utils/configValuesMapper';

import S from './ConfigValuesEditor.styles';
import ValueSetDialog from './ValueSetDialog';

const ConfigValuesEditor = ({ verifierConfig, editable, onChangeCallback }) => {
	const [localSpecConfigs, setLocalSpecConfigs] = useState();
	const [localValueSets, setLocalValueSets] = useState();
	const [selectedValueSet, setSelectedValueSet] = useState();
	const [valueSetUsedIn, setValueSetUsedIn] = useState([]);
	const [vsToSpec, setVsToSpec] = useState({});
	const [openValueSetDialog, setOpenValueSetDialog] = useState(false);

	// TODO: move these to strings.js
	const USEDIN = 'Used in';
	const DESCRIPTION = 'Description';
	const SOURCE = 'Source';
	const DOCUMENTATION = 'Documentation';
	const COMMENTS = 'Comments';
	const VALUES = 'Values';

	useEffect(() => {
		if (verifierConfig) {
			const { expanded } = verifierConfig;
			const { specificationConfigurations, valueSets } = expanded;

			setLocalSpecConfigs(_.cloneDeep(specificationConfigurations));

			// Note: map() returns a deep copy
			const modifiedValueSets = valueSets.map((valueSet) => ({ ...valueSet, name: connvertToDisplayName(valueSet.name) }));
			const orderedValueSets = orderByNameProp(modifiedValueSets);
			setLocalValueSets(orderedValueSets);
		}
	}, [verifierConfig]);

	useEffect(() => {
		if (!selectedValueSet && localValueSets) {
			setSelectedValueSet(localValueSets[0]);
		}
	}, [localValueSets, selectedValueSet]);

	useEffect(() => {
		if (localSpecConfigs) {
			const mapping = vsToSpectMapping(localSpecConfigs);
			if (mapping) {
				setVsToSpec(mapping);
			}
		}
	}, [localSpecConfigs]);

	useEffect(() => {
		if (selectedValueSet && vsToSpec) {
			// TODO: this works but it could be cleaner.
			const { id } = selectedValueSet;
			const originalName = verifierConfig.expanded.valueSets.find((valueSet) => valueSet.id === id).name;
			setValueSetUsedIn(vsToSpec[originalName]);
		}
	}, [selectedValueSet, setValueSetUsedIn, vsToSpec, verifierConfig]);

	const onValueSetSelectedHandler = useCallback(
		(valueSetId) => {
			const valueSet = localValueSets.filter((item) => item.id === valueSetId)[0];
			if (valueSet) {
				setSelectedValueSet(valueSet);
			}
		},
		[localValueSets],
	);

	const onDoneHandler = useCallback(
		(change) => {
			setOpenValueSetDialog(false);

			if (change) {
				const modified = localValueSets.map((localValueSet) => (localValueSet.id === change.id ? change : localValueSet));
				setLocalValueSets(modified);
				setSelectedValueSet(change);

				onChangeCallback(change);
			}
		},
		[onChangeCallback, localValueSets],
	);

	const onShowValueSetDialog = useCallback(() => {
		setOpenValueSetDialog(true);
	}, []);

	return (
		<>
			<S.Page id="configValuesEditor">
				<S.MainContent id="configValuesEditorMainContent">
					{localValueSets && (
						<>
							<S.LeftCol>
								<SideNavItems>
									{localValueSets.map((valueSet) => (
										<ValueSetListItem key={valueSet.id} valueSet={valueSet} selectedValue={selectedValueSet} onClickCallback={onValueSetSelectedHandler} />
									))}
								</SideNavItems>
							</S.LeftCol>
							<S.RightCol>
								<ValueSetItemDetail title={USEDIN} value={valueSetUsedIn} />
								<ValueSetItemDetail title={DESCRIPTION} value={selectedValueSet?.description} />
								<ValueSetItemDetail title={COMMENTS} value={selectedValueSet?.source?.comments} />
								<ValueSetItemDetail title={SOURCE} value={selectedValueSet?.source?.url} type="link" />
								<ValueSetItemDetail title={DOCUMENTATION} value={selectedValueSet?.source?.documentation} type="link" />
								<ValueSetItemDetail title={VALUES} value={selectedValueSet?.items} editable={editable} onClickCallback={onShowValueSetDialog} />
							</S.RightCol>
						</>
					)}
				</S.MainContent>
			</S.Page>

			{selectedValueSet && openValueSetDialog && <ValueSetDialog open={openValueSetDialog} valueSet={selectedValueSet} onDoneCallback={onDoneHandler} />}
		</>
	);
};

export default ConfigValuesEditor;
