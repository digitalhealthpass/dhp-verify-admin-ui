/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button, TextInput, PasswordInput } from 'carbon-components-react';
import { ArrowRight16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import S from './LoginPage.styles';

const LoginPage = ({ loginCallback }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showError, setShowError] = useState(false);
	const [passwordType] = useState('password');
	const btnRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/home';

	const { t } = useTranslation();
	const LOGIN = t('LOGIN:login');
	const EMAIL = t('LOGIN:email');
	const EMAIL_PLACEHOLDER = t('LOGIN:email_placeholder');
	const PASSWORD_PLACEHOLDER = t('LOGIN:password_placeholder');
	const PASSWORD = t('LOGIN:password');
	const LOG_IN = t('LOGIN:log_in');
	const INVALID_LOGIN = t('LOGIN:invalid_auth');
	const PAGE_TITLE = t('LOGIN:PageTitle');

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	const onSubmitHandler = async () => {
		if (btnRef.current) {
			// prevent button mashing
			btnRef.current.setAttribute('disabled', 'disabled');
		}
		const loggedIn = await loginCallback({ email, password });
		if (loggedIn) {
			navigate(from, { replace: true });
		} else {
			setShowError(true);
		}
	};

	const onEmailChange = useCallback((event) => {
		event.preventDefault();
		btnRef.current.removeAttribute('disabled');
		setShowError(false);
		setEmail(event.target.value.trim());
	}, []);

	const onPasswordChange = useCallback((event) => {
		event.preventDefault();
		btnRef.current.removeAttribute('disabled');
		setShowError(false);
		setPassword(event.target.value.trim());
	}, []);

	return (
		<S.LoginPage id="loginPage" className="login-page login-page-dark">
			<S.LoginSideForm className="login-sideform">
				<S.LoginForm className="login-form">
					<div>
						<S.PageTitle>{LOGIN}</S.PageTitle>
					</div>
					<div className="idSection">
						<TextInput id="email" labelText={EMAIL} placeholder={EMAIL_PLACEHOLDER} value={email} autoComplete="username" onChange={onEmailChange} />
					</div>
					<div className="passwordSection">
						<PasswordInput
							id="password"
							labelText={PASSWORD}
							placeholder={PASSWORD_PLACEHOLDER}
							type={passwordType}
							value={password}
							autoComplete="current-password"
							onChange={onPasswordChange}
						/>
					</div>

					<S.ErrorMessageSection show={showError}>
						<S.ErrorMessage>{INVALID_LOGIN}</S.ErrorMessage>
					</S.ErrorMessageSection>

					<Button renderIcon={ArrowRight16} ref={btnRef} type="button" onClick={onSubmitHandler}>
						{LOG_IN}
					</Button>
				</S.LoginForm>
			</S.LoginSideForm>
		</S.LoginPage>
	);
};

export default LoginPage;
