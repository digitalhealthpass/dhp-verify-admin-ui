/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import S from './ConfigDetailPage.styles';

const ConfigHeader = ({ values }) => (
	<div>
		{values && (
			<S.ConfigHeader>
				{values.map(({ value }) => (
					<div className="configHeaderRow" key={value}>
						<div className="value">{value}</div>
					</div>
				))}
			</S.ConfigHeader>
		)}
	</div>
);

export default ConfigHeader;
