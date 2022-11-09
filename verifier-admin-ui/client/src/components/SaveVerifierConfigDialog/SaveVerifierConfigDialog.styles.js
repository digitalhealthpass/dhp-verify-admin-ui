/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { white } from '@carbon/colors';

const { ui03 } = white;

const SaveConfigDialog = styled.div``;

const Content = styled.div`
	background: ${ui03};
	margin: 1rem;
	padding: 1rem;
	width: 100%;
	margin-bottom: 0px;
	padding-bottom: 0px;

	.bx--radio-button-group {
		margin: 1rem 1rem 0rem 1rem;
	}

	.bx--checkbox-wrapper {
		margin-top: 2rem;
	}
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
`;

const Error = styled.div`
	margin: 1rem 0rem 1rem 10rem;
	color: red;
`;

const S = {
	SaveConfigDialog,
	Content,
	MainContent,
	Error,
};

export default S;
