/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { ArrowLeft24 } from '@carbon/icons-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import S from './BackButton.styles';

const BackButton = ({ text, callback }) => {
	const navigate = useNavigate();

	const { t } = useTranslation();
	const TEXT = t('BACK:backText');

	const buttonText = text || TEXT;

	const onClickHandler = useCallback(() => {
		if (callback) {
			callback();
		} else {
			navigate(-1);
		}
	}, [callback, navigate]);

	return (
		<nav aria-label={buttonText}>
			<S.BackButton id="backBtn" kind="ghost" onClick={onClickHandler}>
				<ArrowLeft24 />
				<S.ButtonBackLabel id="backButtonLabel">{buttonText}</S.ButtonBackLabel>
			</S.BackButton>
		</nav>
	);
};

export default BackButton;
