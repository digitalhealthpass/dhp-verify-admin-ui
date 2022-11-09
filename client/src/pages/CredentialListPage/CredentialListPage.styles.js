/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { gray10, gray20 } from '@carbon/colors';

const CredentialsPage = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	max-width: 100%;
`;

const Page = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: row;
	margin-top: 0rem;

	.bx--data-table-container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;

		.bx--table-toolbar {
			overflow: unset;
		}

		th:nth-of-type(1) {
			display: none;
		}
		th:nth-of-type(2) {
			display: none;
		}
		td:nth-of-type(1) {
			display: none;
		}
		td:nth-of-type(2) {
			display: none;
		}
	}

	.bx--inline-notification {
		max-width: inherit;
	}
`;

const CredList = styled.div`
	width: ${(props) => (props.showPanel === true ? '0%' : '100%')};
	visibility: ${(props) => (props.showPanel === true ? 'hidden' : 'visible')};
	transition: width 0.5s ease-in-out, visibility 0.5s;
	display: flex;
	flex-direction: column;

	> div {
		margin: 0rem 2rem 2rem 2rem;
	}
`;

const PageHeader = styled.div`
	height: ${(props) => (props.show === false ? '0%' : 'auto')};
	transition: height 5s ease-in-out;
	div {
		display: ${(props) => (props.show === false ? 'none' : 'flex')};
	}

	#configCatalogBtn {
		margin-left: auto;
	}
`;

const SidePanel = styled.div`
	width: ${(props) => (props.showPanel === true ? '100%' : '0%')};
	transition: width 0.5s ease-out;
	display: flex;
	flex-direction: row;
	flex: 1 1;
`;

const BackNav = styled.nav`
	display: flex;
	flex: 0 0 auto;
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

const S = {
	Page,
	CredentialsPage,
	SidePanel,
	CredList,
	BackNav,
	PageHeader,
};

export default S;
