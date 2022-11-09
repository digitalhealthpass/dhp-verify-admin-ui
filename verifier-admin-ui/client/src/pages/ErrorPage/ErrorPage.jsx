/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import S from './ErrorPage.styles';

const ErrorPage = () => {
	const { t } = useTranslation();
	const TITLE = t('ERROR:title');
	const SUBTITLE = t('ERROR:subtitle');
	const PAGE_TITLE = t('ERROR:PageTitle');

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	return (
		<S.Page id="errorPage">
			<S.Content>
				<S.Title>{TITLE}</S.Title>
				<S.Subtitle>{SUBTITLE}</S.Subtitle>
			</S.Content>
		</S.Page>
	);
};
export default memo(ErrorPage);
