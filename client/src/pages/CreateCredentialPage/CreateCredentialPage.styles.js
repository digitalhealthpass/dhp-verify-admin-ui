/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { white, blue60 } from '@carbon/colors';
import { productiveHeading03 as title, bodyShort02 as helpText } from '@carbon/type';

const { ui03 } = white;

const Page = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	flex: 1 1 auto;

	.bx--form-item {
		margin: 0 0 2rem 0 !important;
		width: 100%;
	}

	.formRow {
		display: flex;
		flex-direction: column;
		.bx--form-item:not(:first-of-type) {
			margin-left: 2rem;
		}
	}

	.buttonRow {
		display: flex;
		justify-content: flex-end;
	}

	.configVersions {
		width: 150px;
	}
`;

const Header = styled.div`
	margin: 2rem;
	${title}
`;

const Progress = styled.div`
	width: 15rem;
	background: ${white};
	padding: 2rem 0rem 0rem 1rem;
	display: none;
`;
const Content = styled.div`
	background: ${ui03};
	margin: 2rem;
`;

const Buttons = styled.div`
	align-self: flex-end;
	margin: 2rem;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1 1 100%;

	.bx--dropdown__wrapper {
		:first-of-type {
			flex: 1 1 auto;
		}
		flex: 0 0 auto;
		margin-bottom: 1rem;
		.bx--list-box__field {
			display: inline-flex;
		}
	}

	.bx--dropdown__wrapper + .bx--dropdown__wrapper {
		margin-left: 2rem;
	}

	.rowActionButton {
		margin: 2rem 0rem 2rem 2rem;
		border: none;
		background: none;
		cursor: pointer;

		svg:hover {
			fill: ${blue60};
		}
	}
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
`;

const HelpText = styled.div`
	padding: 0rem 2rem 2rem 2rem;
	${helpText}
`;

const S = {
	Page,
	Header,
	Progress,
	Content,
	MainContent,
	Buttons,
	Row,
	HelpText,
};

export default S;
