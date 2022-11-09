/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { productiveHeading03 as title, bodyShort02 as helpText, productiveHeading01 as label } from '@carbon/type';
import styled from 'styled-components';

const Page = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	padding: 1rem;

	.export_btn {
		max-height: 3rem;
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

const ResultPanel = styled.div`
	display: flex;
	flex-direction: column;
	flex: 5 1 auto;
	padding: 1rem 2rem 2rem 3rem;
`;

const ResultHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem 0rem;
`;

const ResultTable = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 3rem;
`;

const ResultBreakdown = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	background-color: #fff;
	overflow: auto;
	.bx--chart-holder + .bx--chart-holder {
		margin-top: 2rem;
	}
	.bx--chart-holder {
		min-height: 300px;
	}

	div[aria-label='Make fullscreen'] {
		display: none;
	}
`;

const HelpText = styled.div`
	padding-bottom: 2rem;
	${helpText};
`;

const Row = styled.div`
	${label}
`;

const Column = styled.div`
	display: flex;
	flex-direction: row;
`;

const FilterLabel = styled.div`
	${label}
	padding-bottom: 1rem;
`;

const S = {
	Row,
	Column,
	Page,
	PageTitle,
	HelpText,
	FilterLabel,
	ResultPanel,
	ResultHeader,
	ResultTable,
	ResultBreakdown,
};

export default S;
