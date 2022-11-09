/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { blue60 } from '@carbon/colors';

const PageHeader = styled.div`
	display: flex;
	flex: 0 1;
	width: inherit;
	flex-direction: row;
	padding: 2rem 2rem 0rem 2rem;
	padding-right: 2rem;
	justify-content: space-between;

	#breadcrumb {
		margin: 1rem;
	}

	.rowActionButton {
		margin-right: 0.5rem;
		border: none;
		background: none;
		cursor: pointer;

		svg:hover {
			fill: ${blue60};
		}
	}
`;

const RightJustified = styled.div`
	display: flex;
`;

const S = {
	PageHeader,
	RightJustified,
};

export default S;
