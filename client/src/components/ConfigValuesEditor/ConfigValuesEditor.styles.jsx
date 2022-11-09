/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';

const Page = styled.div`
	display: flex;
	flex-direction: column;

	#btnSaveValues {
		display: flex;
		align-self: flex-end;
	}

	#valueSetName {
		line-height: 2rem;
	}

	.bx--side-nav__items {
		padding: 0px;
	}

	.vsPlainText {
		text-indent: initial;
		padding: 0rem 2rem;
	}

	.vsSpecName {
		font-weight: 500;
		> div {
			font-weight: normal;
		}
	}

	.vsSpecName + .vsSpecName {
		padding-top: 0.5rem;
	}

	#editValueSet {
		min-height: unset;
		margin-left: 0.5rem;
		padding: 0px;
	}
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
	border: 1px solid;
`;

const LeftCol = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	min-width: 300px;
	border-right: 1px solid #cdcdcd;
`;

const RightCol = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	overflow: auto;
	padding: 1rem;
`;

const S = {
	Page,
	MainContent,
	LeftCol,
	RightCol,
};

export default S;
