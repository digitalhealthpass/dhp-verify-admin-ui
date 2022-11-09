/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { TextInput } from 'carbon-components-react';
import { useCallback, useState } from 'react';
import { mergeObjects } from '../../utils/configValuesMapper';

const ValueSetItem = ({ valueSetId, itemId, valueSetItem, onChangeCallback }) => {
	const [localValueSetItem, setLocalValueSetItem] = useState(valueSetItem);

	const onChangeHandler = useCallback(
		(event) => {
			const currentPropValue = { [event?.target?.name]: event?.target?.value };
			const newValueSetItem = mergeObjects(localValueSetItem, currentPropValue);

			setLocalValueSetItem(newValueSetItem);
			onChangeCallback({ valueSetId, itemId, updatedItem: newValueSetItem });
		},
		[localValueSetItem, valueSetId, itemId, onChangeCallback],
	);

	return (
		<>
			{localValueSetItem && (
				<div key={`${valueSetId}_${itemId}`} className="valueSetListItem">
					<TextInput id={`${valueSetId}_${itemId}_value`} inline labelText="Value" name="value" value={localValueSetItem.value} placeholder="Enter value" onChange={onChangeHandler} />

					<TextInput
						id={`${valueSetId}_${itemId}_description`}
						inline
						labelText="Description"
						name="description"
						value={localValueSetItem.description}
						placeholder="Enter description value"
						onChange={onChangeHandler}
					/>
				</div>
			)}
			{!localValueSetItem && <> </>}
		</>
	);
};

export default ValueSetItem;
