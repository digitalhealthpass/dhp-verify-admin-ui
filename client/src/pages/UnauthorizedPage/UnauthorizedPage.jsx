/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import S from './UnauthorizedPage.styles';
import BackButton from '../../components/BackButton/BackButton';

const UnauthorizedPage = () => {
	const { t } = useTranslation();
	const PAGE_TEXT = t('UNAUTHORIZED_PAGE:message');
	const PREVIOUS_PAGE = t('UNAUTHORIZED_PAGE:back');
	const PAGE_TITLE = t('UNAUTHORIZED_PAGE:PageTitle');

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	return (
		<S.Page id="unauthroizedPage">
			{PAGE_TEXT}
			<BackButton text={PREVIOUS_PAGE} />
		</S.Page>
	);
};

export default memo(UnauthorizedPage);
