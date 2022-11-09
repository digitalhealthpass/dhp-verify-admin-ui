/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { g100 } from '@carbon/themes';

const { ui05, ui01 } = g100;

const Page = styled.div`
	background-color: ${ui01};
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	justify-content: space-between;
	align-items: flex-start;
	color: ${ui05};
	height: 100%;
`;

const Content = styled.div`
	display: flex;
	flex: 1 1 auto;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const Title = styled.h1`
	font-weight: 400;
	letter-spacing: 0;
	margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
	letter-spacing: 0;
`;

const S = {
	Page,
	Content,
	Title,
	Subtitle,
};

export default S;
