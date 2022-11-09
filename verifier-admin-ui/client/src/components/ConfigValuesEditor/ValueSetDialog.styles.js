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
// import { bodyShort02 as helpText } from '@carbon/type';

const { ui03 } = white;

const Dialog = styled(Modal)`
	overflow: hidden;

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
		margin: 0rem;
		padding: 0rem;
	}

	.bx--form-item {
		margin-bottom: 1rem;
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

const Content = styled.div`
	background: ${ui03};
	margin: 1rem;
	padding: 1rem;
	width: 100%;
	margin-bottom: 0px;
	padding-bottom: 0px;
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;

	#valueSetDescription {
		margin-bottom: 1rem;
	}

	.valueSetRow {
		display: flex;
		flex: 1 1 auto;
		margin-bottom: 1rem;
		.valueSetListItem {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			.bx--form-item {
				margin-bottom: 0.5rem;
			}
		}
		.deleteItemBtn {
			align-self: center;
			margin-left: 1rem;
			cursor: pointer;
		}
	}

	#addNewValueSet {
		align-self: flex-end;
	}
`;

const Buttons = styled.div``;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
	overflow: auto;
	margin-bottom: 3rem;
`;

const S = {
	Dialog,
	MainContent,
	Content,
	Buttons,
};

export default S;
