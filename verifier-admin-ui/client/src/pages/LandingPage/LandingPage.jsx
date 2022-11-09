/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ArrowRight32 } from '@carbon/icons-react';
import { useAuth } from '../../hooks/useAuth';

import { CONFIG_LIST_PATH, CUST_PATH, ORG_PATH, VER_PATH } from '../../constants/paths';

import Area from './Area';
import S from './LandingPage.styles';
import icon from './teammates.svg';

import { changeRoleByDiv } from '../../utils/changeAtrribute';

const LandingPage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const { t } = useTranslation();
	const TITLE = t('LANDING_PAGE:title');
	const TITLE_SYSADMIN = t('LANDING_PAGE:titleSysAdmin');
	const TITLE_CUSTADMIN = t('LANDING_PAGE:titleCustAdmin');
	const TITLE_ORGADMIN = t('LANDING_PAGE:titleAdmin');
	const TILE_WELCOME_HEADER = t('LANDING_PAGE:titleWelcomeHeader');
	const TILE_WELCOME_BODY_SYSADMIN = t('LANDING_PAGE:titleWelcomeBodySysAdmin');
	const TILE_WELCOME_BODY_CUSTADMIN = t('LANDING_PAGE:titleWelcomeBodyCustAdmin');
	const TILE_WELCOME_BODY_ORGADMIN = t('LANDING_PAGE:titleWelcomeBodyOrgAdmin');
	const TILE1_HEADER_SYSADMIN = t('LANDING_PAGE:tile1HeaderSysAdmin');
	const TILE1_BODY_SYSADMIN = t('LANDING_PAGE:tile1BodySysAdmin');
	const TILE1_HEADER_CUSTADMIN = t('LANDING_PAGE:tile1HeaderCustAdmin');
	const TILE1_BODY_CUSTADMIN = t('LANDING_PAGE:tile1BodyCustAdmin');
	const TILE2_HEADER_CUSTADMIN = t('LANDING_PAGE:tile2HeaderCustAdmin');
	const TILE2_BODY_CUSTADMIN = t('LANDING_PAGE:tile2BodyCustAdmin');
	const TILE1_HEADER_ORGADMIN = t('LANDING_PAGE:tile1HeaderOrgAdmin');
	const TILE1_BODY_ORGADMIN = t('LANDING_PAGE:tile1BodyOrgAdmin');
	const TILE2_HEADER_ORGADMIN = t('LANDING_PAGE:tile2HeaderOrgAdmin');
	const TILE2_BODY_ORGADMIN = t('LANDING_PAGE:tile2BodyOrgAdmin');
	const TILE_HELP_NEW = t('LANDING_PAGE:tileHelpNew');
	const TILE_HELP_GUIDE = t('LANDING_PAGE:tileHelpGuide');
	const PAGE_TITLE = t('LANDING_PAGE:PageTitle');

	useEffect(() => {
		setTimeout(() => {
			changeRoleByDiv();
		}, 500);
	});

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	const showPageTitle = useCallback(() => {
		const { isSysAdmin, isCustAdmin } = user;

		if (isSysAdmin) {
			return (
				<>
					<span className="main">{TITLE}</span>
					<span className="sub">{TITLE_SYSADMIN}</span>{' '}
				</>
			);
		}

		if (isCustAdmin) {
			return (
				<>
					<span className="main">{TITLE}</span>
					<span className="sub">{TITLE_CUSTADMIN}</span>{' '}
				</>
			);
		}

		return (
			<>
				<span className="main">{TITLE}</span>
				<span className="sub">{TITLE_ORGADMIN}</span>{' '}
			</>
		);
	}, []);

	const showBody = useCallback(() => {
		const { isSysAdmin, isCustAdmin } = user;

		if (isSysAdmin) {
			return <S.Body color="#ffffff">{TILE_WELCOME_BODY_SYSADMIN}</S.Body>;
		}

		if (isCustAdmin) {
			return <S.Body color="#ffffff">{TILE_WELCOME_BODY_CUSTADMIN}</S.Body>;
		}

		return <S.Body color="#ffffff">{TILE_WELCOME_BODY_ORGADMIN}</S.Body>;
	}, []);

	const showTiles = useCallback(() => {
		const { isSysAdmin, isCustAdmin } = user;

		if (isSysAdmin) {
			return (
				<Area tabIndex={0} background="#e4e4e4" onClick={() => navigate(CUST_PATH)} onKeyPress={() => navigate(CUST_PATH)} role="link">
					<S.Title color="#161616">{TILE1_HEADER_SYSADMIN}</S.Title>
					<S.Body color="#161616">{TILE1_BODY_SYSADMIN}</S.Body>
					<S.Link>
						<ArrowRight32 />
					</S.Link>
				</Area>
			);
		}

		if (isCustAdmin) {
			return (
				<>
					<Area tabIndex={0} background="#e4e4e4" onClick={() => navigate(CONFIG_LIST_PATH)} onKeyPress={() => navigate(CONFIG_LIST_PATH)} role="link">
						<S.Title color="#161616">{TILE1_HEADER_CUSTADMIN}</S.Title>
						<S.Body color="#161616">{TILE1_BODY_CUSTADMIN}</S.Body>
						<S.Link>
							<ArrowRight32 />
						</S.Link>
					</Area>

					<Area tabIndex={0} background="#e4e4e4" onClick={() => navigate(ORG_PATH)} onKeyPress={() => navigate(ORG_PATH)} role="link">
						<S.Title color="#161616">{TILE2_HEADER_CUSTADMIN}</S.Title>
						<S.Body color="#161616">{TILE2_BODY_CUSTADMIN}</S.Body>
						<S.Link>
							<ArrowRight32 />
						</S.Link>
					</Area>
				</>
			);
		}

		return (
			<>
				<Area tabIndex={0} background="#e4e4e4" onClick={() => navigate(CONFIG_LIST_PATH)} onKeyPress={() => navigate(CONFIG_LIST_PATH)} role="link">
					<S.Title color="#161616">{TILE1_HEADER_ORGADMIN}</S.Title>
					<S.Body color="#161616">{TILE1_BODY_ORGADMIN}</S.Body>
					<S.Link>
						<ArrowRight32 />
					</S.Link>
				</Area>

				<Area tabIndex={0} background="#e4e4e4" onClick={() => navigate(VER_PATH)} onKeyPress={() => navigate(VER_PATH)} role="link">
					<S.Title color="#161616">{TILE2_HEADER_ORGADMIN}</S.Title>
					<S.Body color="#161616">{TILE2_BODY_ORGADMIN}</S.Body>
					<S.Link>
						<ArrowRight32 />
					</S.Link>
				</Area>
			</>
		);
	}, []);

	return (
		<S.Page id="landingPage">
			<S.PageTitle>{showPageTitle()}</S.PageTitle>
			<S.MainContent>
				<S.Image id="landingPageImage">
					<img src={icon} alt="teammates" />
				</S.Image>

				<Area background="#0043ce">
					<S.Title color="#ffffff">{TILE_WELCOME_HEADER}</S.Title>
					{showBody()}
				</Area>

				{showTiles()}

				<Area background="#e2fbfb">
					<S.Title color="#161616">Help & resources</S.Title>
					<S.Body>
						<nav aria-label={TILE_HELP_NEW}>
							<p>
								↳{' '}
								<a href={`${process.env.PUBLIC_URL}/new.pdf`} rel="noreferrer" target="_blank">
									{TILE_HELP_NEW}
								</a>
							</p>
						</nav>
						<nav aria-label={TILE_HELP_GUIDE}>
							<p>
								↳{' '}
								<a href={`${process.env.PUBLIC_URL}/admin.pdf`} rel="noreferrer" target="_blank">
									{TILE_HELP_GUIDE}
								</a>
							</p>
						</nav>
					</S.Body>
				</Area>
			</S.MainContent>
		</S.Page>
	);
};

export default LandingPage;
