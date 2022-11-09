/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Edit16 } from '@carbon/icons-react';
import S from './ValueEditButton.styles';

const ValueEdit = ({ onClickCallback }) => (
	<nav aria-label="Edit value set">
		<S.EditValueSetButton id="editValueSet" kind="ghost" onClick={onClickCallback}>
			<Edit16 />
		</S.EditValueSetButton>
	</nav>
);

export default ValueEdit;
