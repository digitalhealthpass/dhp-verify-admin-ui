/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Button } from 'carbon-components-react';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import ValueSet from './ValueSet';

import S from './ValueSetDialog.styles';

const ValueSetDialog = ({ valueSet, open, onDoneCallback }) => {
	const [dirty, setDirty] = useState(false);
	const [addDisabled, setAddDisabled] = useState(false);
	const [doneDisabled, setDoneDisabled] = useState(true);
	const [localValueSet, setLocalValueSet] = useState();

	const { t } = useTranslation();
	const BTN_CANCEL = t('CONFIG_VALUES_EDITOR:btnCancel');
	const BTN_CLOSE = t('CONFIG_VALUES_EDITOR:btnClose');

	useEffect(() => {
		const unqiueValueSetItems = valueSet.items.map((item) => ({
			...item,
			id: uuid(),
		}));
		const uniqueValueSets = { ...valueSet, items: unqiueValueSetItems };

		setLocalValueSet(_.cloneDeep(uniqueValueSets));
	}, [valueSet]);

	useEffect(() => {
		if (localValueSet?.items && dirty) {
			const hasEmpty = localValueSet.items.some((item) => item.value === '');
			setAddDisabled(hasEmpty);
			setDoneDisabled(hasEmpty);
		}
	}, [localValueSet, dirty]);

	const onAddHandler = useCallback(
		(addObject) => {
			const updateValueSetItems = [...localValueSet.items, addObject];
			const updatedValueSet = { ...localValueSet, items: updateValueSetItems };
			setLocalValueSet(updatedValueSet);
			setDirty(true);
			setDoneDisabled(false);
		},
		[localValueSet],
	);

	const onDeleteHandler = useCallback(
		(deleteObject) => {
			const updateValueSetItems = localValueSet.items.filter((item) => item.id !== deleteObject.id);
			const updatedValueSet = { ...localValueSet, items: updateValueSetItems };
			setLocalValueSet(updatedValueSet);
			setDirty(true);
			setDoneDisabled(false);
		},
		[localValueSet],
	);

	const onChangeHandler = useCallback(
		(updatedObject) => {
			const updateValueSetItems = localValueSet.items.map((item) => (item.id === updatedObject.updatedItem.id ? updatedObject.updatedItem : item));
			const updatedValueSet = { ...localValueSet, items: updateValueSetItems };
			setLocalValueSet(updatedValueSet);
			setDirty(true);
			setDoneDisabled(false);
		},
		[localValueSet],
	);

	const onCancelCallHandler = useCallback(() => {
		setDirty(false);
		onDoneCallback(); // don't send back anything
	}, [onDoneCallback]);

	const onDoneHandler = useCallback(() => {
		setDirty(false);
		// eslint-disable-next-line no-param-reassign
		localValueSet.items.forEach((item) => delete item.id);
		onDoneCallback(localValueSet);
	}, [onDoneCallback, localValueSet]);

	return (
		<div>
			{localValueSet && open && (
				<S.Dialog id="editValueSet" modalHeading={localValueSet.name} passiveModal open={open}>
					<S.MainContent>
						<S.Content>
							<div id="valueSetDescription">{localValueSet.description}</div>

							<ValueSet
								key={`${localValueSet.id}_valueSet`}
								valueSet={localValueSet}
								addDisabled={addDisabled}
								onChangeCallback={onChangeHandler}
								onAddCallback={onAddHandler}
								onDeleteCallback={onDeleteHandler}
							/>
						</S.Content>
					</S.MainContent>

					<S.Buttons className="bx--modal-footer bx--btn-set">
						<Button kind="secondary" onClick={onCancelCallHandler}>
							{BTN_CANCEL}
						</Button>
						<Button kind="primary" onClick={onDoneHandler} disabled={doneDisabled}>
							{BTN_CLOSE}
						</Button>
					</S.Buttons>
				</S.Dialog>
			)}
		</div>
	);
};

export default ValueSetDialog;
