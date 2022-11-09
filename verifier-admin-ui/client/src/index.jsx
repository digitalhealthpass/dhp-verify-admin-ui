/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ErrorBoundary from './ErrorBoundry';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading...</div>}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root'),
);
