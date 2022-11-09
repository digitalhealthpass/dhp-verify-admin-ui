/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import S from './LogoutPage.styles';
import { useAuth } from '../../hooks/useAuth';
import { useAppContext } from '../../hooks/useAppContext';

const LogoutPage = () => {
	const { t } = useTranslation();
	const PAGE_TITLE = t('LOGOUT_PAGE:PageTitle');
	const { logout } = useAuth();
	const { clearAppContext } = useAppContext();

	const [timer, setTimer] = useState(10);

	clearAppContext();

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	useEffect(() => {
		if (timer >= 1) {
			setTimeout(() => {
				setTimer(timer - 1);
			}, 1000);
		} else {
			logout({ redirect: '/' });
		}
	});

	return (
		<S.Page id="logoutPage">
			<div className="text1">{t('LOGOUT_PAGE:message1')}</div>
			<div className="text2">{t('LOGOUT_PAGE:message2', { timer })}</div>
		</S.Page>
	);
};

export default memo(LogoutPage);
