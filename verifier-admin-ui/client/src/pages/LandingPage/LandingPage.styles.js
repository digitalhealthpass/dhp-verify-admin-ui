/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

// import { gray20, gray30 } from '@carbon/colors';
import { expressiveHeading06 as main, expressiveHeading05 as sub, expressiveHeading02 as title, bodyShort02 as body } from '@carbon/type';
// import { spacing07 } from '@carbon/layout';
import styled from 'styled-components';

const Page = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
`;

const PageTitle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 0 0 5rem;
	/* justify-content: center; */
	align-items: center;
	margin: 1rem;
	.main {
		${main}
		margin-right: 1rem;
	}
	.sub {
		${sub}
	}
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1 1 auto;
	/* margin: 1rem; */
`;

const Image = styled.div`
	display: flex;
	flex-direction: row;
	flex: 0 0 5rem;
	min-width: 5rem;
	margin: 2rem 1rem 1rem 1rem;
	align-items: flex-start;
	max-height: 25rem;
`;

const Instructional = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	padding: 1rem;
	margin: 1rem;
	background: ${(props) => props.background};
	color: ${(props) => props.color};
	max-height: 25rem;
	max-width: 13rem;
`;

const Title = styled.div`
	color: ${(props) => props.color};
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	margin-bottom: 0.5rem;
	${title}
`;

const Body = styled.div`
	color: ${(props) => props.color};
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	${body}
`;

const Link = styled.div`
	color: #0f62fe;
	display: flex;
	flex: 0 0 auto;
	align-self: end;
	cursor: pointer;
`;

const S = {
	Page,
	PageTitle,
	MainContent,
	Image,
	Instructional,
	Title,
	Body,
	Link,
};

export default S;
