/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Add16, TrashCan24 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import ValueSetItem from './ValueSetItem';

const ValueSet = ({ valueSet, addDisabled, onAddCallback, onDeleteCallback, onChangeCallback }) => {
	const [localValueSet, setLocalValueSet] = useState();

	const { t } = useTranslation();
	const ADD_NEW_VALUE_SET = t('CONFIG_VALUES_EDITOR:addNewValueSet');

	useEffect(() => {
		if (valueSet) {
			setLocalValueSet(valueSet);
		}
	}, [valueSet]);

	const onChangeHandler = useCallback(
		(updated) => {
			onChangeCallback(updated);
		},
		[onChangeCallback],
	);

	const onAddHandler = useCallback(() => {
		const newItem = { value: '', description: '', id: uuid() };
		onAddCallback(newItem);

		const modifiedValueSetItems = [...localValueSet.items, newItem];
		const modifiedValueSet = { ...localValueSet, items: modifiedValueSetItems };
		setLocalValueSet(modifiedValueSet);
	}, [onAddCallback, localValueSet]);

	const onDeleteHandler = useCallback(
		(event) => {
			const deleteId = event.currentTarget.attributes.value.value;

			if (deleteId) {
				const deleteItem = localValueSet.items.find((item) => item.id === deleteId);
				onDeleteCallback(deleteItem);

				const modifiedValueSetItems = localValueSet.items.filter((item) => item.id !== deleteId);
				const modifiedValueSet = {
					...localValueSet,
					items: modifiedValueSetItems,
				};
				setLocalValueSet(modifiedValueSet);
			}
		},
		[onDeleteCallback, localValueSet],
	);

	return (
		<>
			<div id="valueSetList">
				{localValueSet?.items?.map((item) => (
					<div className="valueSetRow" key={item.id}>
						<ValueSetItem valueSetId={localValueSet.id} itemId={item.id} valueSetItem={item} onChangeCallback={onChangeHandler} />

						{localValueSet.maxItems !== 1 && localValueSet.items.length !== 1 && <TrashCan24 className="deleteItemBtn" value={item.id} onClick={onDeleteHandler} />}
					</div>
				))}
			</div>

			{localValueSet?.maxItems !== 1 && (
				<Button id="addNewValueSet" kind="primary" tabIndex={0} type="submit" renderIcon={Add16} iconDescription="Add" aria-label={ADD_NEW_VALUE_SET} onClick={onAddHandler} disabled={addDisabled}>
					{ADD_NEW_VALUE_SET}
				</Button>
			)}
		</>
	);
};

export default ValueSet;
