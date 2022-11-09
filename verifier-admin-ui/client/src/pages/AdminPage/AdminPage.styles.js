/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { productiveHeading03 as title, productiveHeading02 as subtitle } from '@carbon/type';

const Page = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;

	.bx--data-table-container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		overflow: auto;
		padding: 0rem 2rem 2rem 2rem;

		.bx--table-toolbar {
			overflow: unset;
		}
	}
`;

const PageTitle = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;

	.custName {
		${title}
	}
	.orgName {
		${subtitle}
	}
`;

const S = {
	Page,
	PageTitle,
};

export default S;
