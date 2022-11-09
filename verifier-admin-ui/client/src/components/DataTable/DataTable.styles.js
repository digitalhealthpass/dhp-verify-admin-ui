/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { blue60, red60 as red, orange40 as orange, green60 as green } from '@carbon/colors';
import { bodyShort02 as helpText } from '@carbon/type';

const Status = styled.div`
	margin-right: 0.5rem;
	display: inline-block;
	width: 10px;
	height: 10px;
	background-color: ${(props) => (props.status === 'active' || props.status === 'Active' ? `${green}` : props.status === 'expiresSoon' ? `${orange}` : `${red}`)};
	border-radius: 11px;
`;

const TableHelpText = styled.div`
	padding: 0rem 1rem 1rem 1rem;
	${helpText}
`;

const Table = styled.div`
	display: flex;
	flex-grow: 1;
	.bx--data-table-header__title {
		word-break: break-word;
	}

	td {
		word-break: break-word;
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

	.actionButtons {
		min-width: 210px;
	}

	th:first-of-type,
	td:first-of-type {
		display: none;
	}
`;

const S = {
	Table,
	TableHelpText,
	Status,
};

export default S;
