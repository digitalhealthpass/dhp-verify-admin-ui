/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import S from './LandingPage.styles';

const Area = (props) => {
	const { children } = props;

	return <S.Instructional {...props}>{children}</S.Instructional>;
};

export default Area;
