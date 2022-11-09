/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useTranslation } from 'react-i18next';
import S from './ConfigDetailPage.styles';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Display = ({ values }) => {
	const { t } = useTranslation();
	const NO_DISPLAY_RULES = t('CONFIG_DETAILS_PAGE:rulesNoDisplay');

	return (
		<S.Section>
			<S.SectionTitle>Display</S.SectionTitle>
			{(!values || values.length === 0) && <S.SectionValue>{NO_DISPLAY_RULES}</S.SectionValue>}

			{values.map((value, index, arr) => {
				if (value && value.name) {
					return (
						<div key={value.id}>
							{arr.length > 1 && <S.RuleSet>{capitalizeFirstLetter(value.category)}</S.RuleSet>}
							<S.Rule>
								<S.SectionValue>{value.name}</S.SectionValue>
							</S.Rule>
						</div>
					);
				}
				return <div />;
			})}
		</S.Section>
	);
};

export default Display;
