/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { memo, useEffect } from 'react';
import { Button } from 'carbon-components-react';
import { ArrowLeft16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const GO_BACK = t('ABOUT:back');
	const TITLE = t('ABOUT:title');
	const WHAT = t('ABOUT:what');
	const WHAT_DESC = t('ABOUT:what_desc');
	const WHY = t('ABOUT:why');
	const WHY_DESC = t('ABOUT:why_desc');
	const HOW = t('ABOUT:how');
	const HOW_DESC = t('ABOUT:how_desc');
	const PAGE_TITLE = t('ABOUT:PageTitle');

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	return (
		<div id="aboutPage" className="bx--row consent" style={{ height: '1000px' }}>
			<div className="bx--col" style={{ background: '#252525' }}>
				<div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
					<div className="bx--row" style={{ color: 'white' }}>
						<div className="bx--col" style={{ marginTop: '7%' }}>
							<div className="bx--row">
								<div className="bx--col-lg-6 bx--offset-md-2">
									<Button
										style={{
											background: 'none',
											marginLeft: '-12px',
										}}
									>
										<ArrowLeft16
											style={{
												fill: '#78A9FF',
												height: '1.5em',
												width: '1.5em',
												marginRight: '1em',
											}}
										/>
										<span
											role="link"
											tabIndex={0}
											style={{ color: '#78A9FF' }}
											onClick={() => {
												navigate.goBack();
											}}
											onKeyPress={() => {
												navigate.goBack();
											}}
										>
											{GO_BACK}
										</span>
									</Button>
									<h2 style={{ fontWeight: '600' }}>{TITLE}</h2>
								</div>
							</div>

							<div className="bx--row" style={{ marginTop: '4em' }}>
								<div className="bx--col-md-2">
									<h6 style={{ padding: '1em' }}>{WHAT}</h6>
								</div>
								<div className="bx--col-lg-8">
									<p>{WHAT_DESC}</p>
								</div>
							</div>
							<div className="bx--row" style={{ marginTop: '2em' }}>
								<div className="bx--col-md-2">
									<h6 style={{ padding: '1em' }}>{WHY}</h6>
								</div>
								<div className="bx--col-lg-8">
									<p>{WHY_DESC}</p>
								</div>
							</div>
							<div className="bx--row" style={{ marginTop: '2em' }}>
								<div className="bx--col-md-2">
									<h6 style={{ padding: '1em' }}>{HOW}</h6>
								</div>
								<div className="bx--col-lg-8">
									<p>{HOW_DESC}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default memo(AboutPage);
