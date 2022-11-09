/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { BrowserRouter as Router } from 'react-router-dom';
import { Loading } from 'carbon-components-react';
import AppHeader from './components/Header/Header';
import { ProvideAuth } from './hooks/useAuth';
import ScrollToTop from './utils/scrollToTop';

import S from './App.styles';

import './App.scss';
import './i18n';

import MainRouter from './routes/MainRouter';
import { ProvideApp } from './hooks/useAppContext';

const App = () => (
	<Router basename="/verifier-admin">
		<ProvideAuth>
			<ProvideApp>
				<Loading />
				<ScrollToTop />
				<S.Header id="appHeader">
					<AppHeader />
				</S.Header>

				<S.MainContent id="mainContent">
					<MainRouter />
				</S.MainContent>
			</ProvideApp>
		</ProvideAuth>
	</Router>
);

export default App;
