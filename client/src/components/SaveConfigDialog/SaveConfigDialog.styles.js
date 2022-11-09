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

const { ui03 } = white;

const SaveConfigDialog = styled(Modal)`
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

	.formSection {
		margin-bottom: 1rem;
	}

	.formRow {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;

		> div {
			margin-bottom: 1rem;
		}

		#version {
			width: 100px;
		}

		.cacheSettings {
			margin-bottom: 2rem;
		}

		.bx--checkbox-wrapper {
			margin-top: 0.5rem;
		}

		.bx--checkbox-label-text {
			font-size: 0.75rem;
			color: #525252;
		}
	}

	.buttonRow {
		margin-top: 2rem;
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

const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1 1 auto;
	margin-left: 10rem;
	align-items: center;

	> div {
		margin-top: 0.1875rem;
		flex: 0;
	}
	> div + div {
		margin-left: 6rem;
	}
`;

const Error = styled.div`
	margin: 1rem 0rem 1rem 10rem;
	color: red;
`;

const S = {
	SaveConfigDialog,
	Header,
	Progress,
	Content,
	MainContent,
	Buttons,
	Row,
	Error,
};

export default S;
