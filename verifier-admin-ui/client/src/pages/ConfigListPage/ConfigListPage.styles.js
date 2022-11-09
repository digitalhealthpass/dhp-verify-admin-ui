/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { productiveHeading03 as title, bodyShort02 as helpText } from '@carbon/type';
import { gray20, gray10 } from '@carbon/colors';

const Page = styled.main`
	display: flex;
	flex-direction: column;
	overflow: auto;
	flex: 1 1 auto;

	.bx--tabs--scrollable__nav-link {
		width: auto;
	}

	.bx--data-table-container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;

		.bx--table-toolbar {
			overflow: unset;
		}
	}
`;

const PageTitle = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
	${title}
`;

const BackNav = styled.nav`
	display: flex;
	flex: 0 0 2rem;
	background-color: ${gray10};

	button {
		padding: 0px;
		:hover {
			background-color: ${gray20};
		}
	}

	.bx--btn__icon {
		height: 2rem;
		width: 2rem;
	}
`;

const MainContent = styled.div`
	margin: 1rem 2rem 2rem 2rem;
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
`;

const NoData = styled.div`
	display: inline-block;
	flex: 1 1 auto;
	margin-top: 2rem;

	#noConfigsText,
	#noConfigsLink {
		${title}
		padding-bottom: .5rem;
	}
`;

const HelpText = styled.div`
	padding: 0rem 0rem 2rem 0rem;
	${helpText}
`;

const ConfigCatalog = styled.span`
	Button {
		background-color: transparent;
		color: #0f62fe;
		position: relative;
		bottom: 10px;
		font-size: 1.25rem;
		font-weight: 400;
		letter-spacing: 0px;
		padding: 0rem 4px;
	}

	Button:hover {
		background-color: transparent;
		color: #0f62fe;
	}
`;

const S = {
	Page,
	PageTitle,
	BackNav,
	MainContent,
	NoData,
	HelpText,
	ConfigCatalog,
};

export default S;
