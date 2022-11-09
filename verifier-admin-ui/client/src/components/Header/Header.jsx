/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { HeaderGlobalBar, HeaderMenu, HeaderMenuItem, HeaderName } from 'carbon-components-react/lib/components/UIShell';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { LANDING_PATH, LOGIN_PATH } from '../../constants/paths';
import { useAppContext } from '../../hooks/useAppContext';
import S from './Header.styles';

const openLicense = () => {
	window.open('https://www.yourcompany.com/privacy/', '_blank');
};

const openDocs = () => {
	window.open(`${process.env.PUBLIC_URL}/admin.pdf`, '_blank');
};

const AppHeader = () => {
	const navigate = useNavigate();
	const { clearAppContext } = useAppContext();

	const { t } = useTranslation();
	const HEADERSTRING = t('HEADER:app_name');
	const LOGOUT = t('HEADER:logout');
	const HELP = t('HEADER:help');
	// const ABOUT = t('HEADER:about');
	const PRIVACY = t('HEADER:privacy');
	const DOCS = t('HEADER:docs');

	const { user, logout } = useAuth();
	const { authenticated, userName } = user;

	const handleLogout = async () => {
		await logout({ redirect: LOGIN_PATH });
		clearAppContext();
		// navigate(LOGIN_PATH);
	};

	return (
		<S.HeaderWrapper id="headerComponent" aria-label={HEADERSTRING}>
			<HeaderName
				tabIndex={0}
				onKeyPress={() => {
					navigate(LANDING_PATH);
				}}
				prefix=""
				onClick={() => {
					navigate(LANDING_PATH);
				}}
			>
				{HEADERSTRING}
			</HeaderName>

			<HeaderGlobalBar>
				{
					// Don't show the logout link with the userName until we have the userName
					authenticated && (
						<HeaderMenu className="_auto_logoutMenu" menuLinkName={userName} aria-label={userName}>
							<HeaderMenuItem aria-label={LOGOUT} className="_auto_logout" onClick={handleLogout} onKeyPress={handleLogout}>
								{LOGOUT}
							</HeaderMenuItem>
						</HeaderMenu>
					)
				}

				<HeaderMenu className="_auto_licenseMenu helpMenu" menuLinkName={HELP} aria-label={HELP}>
					<HeaderMenuItem className="_auto_license" onClick={openLicense} onKeyPress={openLicense}>
						{PRIVACY}
					</HeaderMenuItem>
					<HeaderMenuItem className="_auto_about" onClick={openDocs} onKeyPress={openDocs}>
						{DOCS}
					</HeaderMenuItem>
				</HeaderMenu>
			</HeaderGlobalBar>
		</S.HeaderWrapper>
	);
};

export default AppHeader;
