/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Button } from 'carbon-components-react';
import QRCode from 'qrcode';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import S from './Credential.styles';

const Credential = ({ credData }) => {
	const { verifiableCredential, verifierCredential } = credData;
	const { expirationDate } = verifiableCredential;
	const { configName } = verifierCredential;

	const { t } = useTranslation();
	const HELP_TEXT = t('CREDENTIAL:tableHelp');
	const CONFIGURUATION = t('CREDENTIAL:lblConfig');
	const EXPIRES = t('CREDENTIAL:lblExpires');

	const displayProps = [
		// { name: 'Name:', value: label },
		{ name: CONFIGURUATION, value: configName },
		// { name: 'Company:', value: customer },
		// { name: 'Organization:', value: organization },
		{ name: EXPIRES, value: new Date(expirationDate).toLocaleString() },
	];

	useEffect(() => {
		const imgElement = document.getElementById('qrCode');
		const options = { scale: 2, errorCorrectionLevel: 'L' };
		QRCode.toDataURL(JSON.stringify(verifiableCredential), options).then((credImg) => {
			imgElement.src = credImg;
		});
	}, [credData, verifiableCredential]);

	const onCopyHandler = useCallback(() => {
		const base64String = btoa(JSON.stringify(verifiableCredential));
		navigator.clipboard.writeText(base64String);
	}, [verifiableCredential]);

	return (
		<S.Page id="qrCodePage">
			<S.PrintHeader>Digital Health Pass Verifier Credential</S.PrintHeader>
			<S.HelpText id="qrCodeHelpText">{HELP_TEXT}</S.HelpText>
			<S.Row id="qrCodeRow">
				<S.Image id="qrCodeImage">
					<img id="qrCode" width="300" height="300" alt="verifier credential" />
				</S.Image>
				<S.Details id="qrCodeDetails">
					{displayProps.map((item) => (
						<S.Row className="detailItemRow" key={item.name}>
							{item.name && <S.Label>{item.name}</S.Label>}
							<S.Value>{item.value}</S.Value>
						</S.Row>
					))}
					<S.Button>
						<Button id="copyToClipboard" kind="ghost" onClick={onCopyHandler}>
							Copy to clipboard
						</Button>
					</S.Button>
				</S.Details>
			</S.Row>
		</S.Page>
	);
};

export default Credential;
