/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error,
			errorInfo,
		});
	}

	render() {
		const { children } = this.props;
		const { errorInfo, error } = this.state;
		if (errorInfo) {
			return (
				<div>
					<h2>Something went wrong.</h2>
					<details style={{ whiteSpace: 'pre-wrap' }}>
						{error && error.toString()}
						<br />
						{errorInfo.componentStack}
					</details>
				</div>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
