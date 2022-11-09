/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { Button } from 'carbon-components-react';

const EditValueSetButton = styled(Button)`
	display: flex;
	flex: 0 0 auto;
	align-self: end;
	cursor: pointer;
	:hover {
		color: #0f62fe;
	}
`;

const S = {
	EditValueSetButton,
};

export default S;
