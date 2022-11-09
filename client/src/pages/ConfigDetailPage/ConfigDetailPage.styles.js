/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import styled from 'styled-components';
import { productiveHeading03 as title, productiveHeading02 as subtitle, bodyShort01 as text, productiveHeading01 as sectionHeading } from '@carbon/type';
import { gray20, gray10, white } from '@carbon/colors';

const Page = styled.main`
	display: flex;
	flex-direction: column;
	overflow: auto;
	flex: 1 1 auto;
	padding: 2rem;
	/* background-color: ${gray20}; */
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

const ErrorContent = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	margin: 2rem 2rem 2rem 1rem;
	align-items: center;
	align-self: center;
`;

const MainContent = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	margin: 1rem 2rem 2rem 1rem;
`;

const PageHeader = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	margin-bottom: 1rem;
`;

const ConfigContent = styled.div`
	display: flex;
	flex-direction: row;
	border: 1px solid;

	&.mainContent {
		flex: 1 1 auto;
	}
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-right: 0.5px solid lightgray;
	/* margin-right: 1rem; */

	nav {
		position: relative;
		/* margin-bottom: 1rem; */
	}
`;

const ConfigHeader = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	/* border: 1px solid black; */
	/* padding: 1rem; */
	/* margin-right: 1rem; */
	/* background-color: ${white}; */

	.configHeaderRow {
		display: inline-flex;
		align-items: center;
		${text}
		.name {
			${subtitle}
			line-height: 1.5rem;
			align-items: center;
			width: 5rem;
			:after {
				content: ':';
			}
			margin-right: 1rem;
		}

		.value {
			margin: 0.5rem 0rem;
			${subtitle}
		}
	}
`;

const ConfigCache = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 200px;
	background-color: ${white};

	.configHeaderRow {
		display: inline-flex;
		align-items: center;
		text-indent: 1rem;
		.name {
			width: 4rem;
			${text}
			line-height: 1.5rem;
			align-items: center;
			margin-right: 1rem;
		}

		.value {
			${text}
			line-height: 1.5rem;
			align-items: center;
		}
	}
`;

const ConfigMain = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	/* border: 1px solid black; */
	border-top: none;
	padding: 1rem;
	overflow: auto;
	background-color: ${white};
`;

const ConfigCredType = styled.nav`
	display: flex;
	flex-direction: column;
	flex: 0 0;
	min-width: 10rem;
	padding: 1rem;

	.credtypetitle {
		padding: 1rem;
	}

	.credSpecType {
		line-height: 2rem;
		text-indent: 2rem;

		:hover {
			cursor: pointer;
			background-color: ${gray20};
		}
	}
`;

const SectionTitle = styled.div`
	${sectionHeading}
	background-color: #ededed;
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	:after {
		content: ':';
	}
`;

const CredTypeItem = styled.div`
	background-color: ${(props) => (props.currCredType === props.value ? '#e3e3e3' : 'none')};
`;

const Section = styled.div`
	display: flex;
	flex: 0 0 auto;
	margin-bottom: 1rem;
	flex-direction: column;
`;

const SectionValue = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	${text}
	text-indent: 2rem;
`;

const ConfigMainSection = styled.div`
	display: flex;
	flex: 1 1;
	flex-direction: column;
	${text}
	min-width: 500px;
	/* background-color: #e4e4e4; */
`;

const ConfigMainTitle = styled.div`
	display: flex;
	flex: 0 0;
	flex-direction: column;
	${title}
	background-color: #e4e4e4;
	/* border: 1px solid black; */
	border-bottom: none;
	padding: 1rem;
`;

const RuleSet = styled.div`
	display: flex;
	flex: 1 1;
	flex-direction: column;
	${sectionHeading}
	text-indent: 1rem;
	line-height: 2rem;
`;

const Rule = styled.div`
	display: flex;
	flex: 1 1;
	flex-direction: column;
	${text}
	text-indent: 2rem;
	line-height: 1.5rem;
	/* :not():last-child {
    margin-bottom: 1rem;
  } */
`;

const Title = styled.div`
	display: flex;
	${title}
`;

const Body = styled.div`
	margin-top: 1rem;
	${text}
`;

const Specifications = styled.label`
	${subtitle}
	background-color: white;
	padding: 1.5rem 1rem 0.5rem 1rem;
	/* border-bottom: .5px solid */
`;

const ButtonArea = styled.div`
	display: flex;
	flex: 0 0 auto;
	margin-top: 1rem;
	align-self: self-end;
`;

const S = {
	Page,
	BackNav,
	ErrorContent,
	MainContent,
	ConfigContent,
	Col,
	ConfigHeader,
	ConfigCache,
	ConfigMain,
	ConfigCredType,
	SectionTitle,
	SectionValue,
	CredTypeItem,
	Section,
	ConfigMainTitle,
	ConfigMainSection,
	RuleSet,
	Rule,
	Title,
	Body,
	Specifications,
	ButtonArea,
	PageHeader,
};

export default S;
