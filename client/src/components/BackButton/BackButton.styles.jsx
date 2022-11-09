/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { Button } from 'carbon-components-react';

const BackButton = styled(Button)`
	color: #0f62fe;
	display: flex;
	flex: 0 0 auto;
	align-self: end;
	cursor: pointer;
`;

const ButtonBackLabel = styled.div`
	margin-left: 0.5rem;
`;

const S = {
	BackButton,
	ButtonBackLabel,
};

export default S;
