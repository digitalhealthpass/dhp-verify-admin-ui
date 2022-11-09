/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { productiveHeading03 as heading, productiveHeading04 as printPageHeading, bodyShort02 as helpText } from '@carbon/type';
import { spacing05, spacing03 } from '@carbon/layout';

const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;

	@media print {
		margin-top: 4rem;
		margin-left: 4rem;
	}
`;

const PrintHeader = styled.div`
	display: none;
	${printPageHeading};
	margin-bottom: 2rem;

	@media print {
		display: flex;
		flex-direction: row;
	}
`;

const Image = styled.div`
	margin: 0 2rem;
`;

const Details = styled.div`
	width: 100%;
	margin-right: 2rem;
`;

const Header = styled.div`
	${heading};
	margin-bottom: ${spacing05};
`;

const Row = styled.div`
	display: flex;
	margin-bottom: ${spacing03};

	&.detailItemRow {
		margin-left: 1rem;
	}
`;

const Label = styled.div`
	${helpText};
	margin-right: ${spacing03};
`;

const Value = styled.div`
	${helpText};
`;

const Button = styled.div`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	margin: 6rem 2rem 2rem 2rem;
	right: 2rem;
`;

const HelpText = styled.div`
	padding: 0rem 2rem 2rem 2rem;
	${helpText}
`;

const S = {
	PrintHeader,
	HelpText,
	Page,
	Image,
	Details,
	Header,
	Row,
	Label,
	Value,
	Button,
};

export default S;
