/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useTranslation } from 'react-i18next';
import S from './ConfigDetailPage.styles';

const ConfigCache = ({ values }) => {
	const { t } = useTranslation();
	const CACHE_POLICY = t('CONFIG_DETAILS_PAGE:lblCachePolicy');

	return (
		<div>
			{values && (
				<S.ConfigCache>
					<S.SectionTitle>{CACHE_POLICY}</S.SectionTitle>
					{values.map(({ name, value }) => (
						<div className="configHeaderRow" key={value}>
							<div className="name">{name}</div>
							<div className="value">{value}</div>
						</div>
					))}
				</S.ConfigCache>
			)}
		</div>
	);
};

export default ConfigCache;
