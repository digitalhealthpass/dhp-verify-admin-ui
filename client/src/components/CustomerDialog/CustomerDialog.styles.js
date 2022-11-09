/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { white } from '@carbon/colors';
import { Modal } from 'carbon-components-react';
import { bodyShort02 as helpText } from '@carbon/type';

const { ui03 } = white;

const CustomerDialog = styled(Modal)`
	.hidden {
		display: none !important;
	}

	.bx--modal-header {
		background: ${white};
		margin-bottom: 0px;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid lightgray;

		.bx--modal-close {
			display: none;
		}
	}
	.bx--modal-content {
		flex-direction: column;
		display: flex;
		margin: 0px;
		padding: 0px;
		> div:first-child {
			flex: 1;
		}
	}

	.bx--form-item {
		margin-bottom: 1.75rem;
	}

	.formSection {
		margin-bottom: 1rem;
	}

	.formRow {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
	}

	.buttonRow {
		display: flex;
		justify-content: flex-end;
	}
`;

const Header = styled.div``;

const Progress = styled.div`
	width: 15rem;
	background: ${white};
	padding: 2rem 0rem 0rem 1rem;
	display: none;
`;

const Content = styled.div`
	background: ${ui03};
	margin: 1rem;
	padding: 1rem;
	width: 100%;
	margin-bottom: 0px;
	padding-bottom: 0px;
`;

const Buttons = styled.div``;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
`;

const HelpText = styled.div`
	padding-bottom: 1rem;
	${helpText}
`;

const S = {
	CustomerDialog,
	Header,
	Progress,
	Content,
	MainContent,
	Buttons,
	HelpText,
};

export default S;
