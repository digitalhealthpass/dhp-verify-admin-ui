/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useEffect, useState } from 'react';
import S from './ConfigDetailPage.styles';

const Rules = ({ value }) => {
	const [categorized, setCategorized] = useState([]);

	useEffect(() => {
		const categorizedObj = {};

		value.forEach((element) => {
			const cat = element.category.charAt(0).toUpperCase() + element.category.slice(1);
			const newValue = categorizedObj[cat] ? [...categorizedObj, element] : [element];
			categorizedObj[cat] = newValue;
		});

		setCategorized(categorized);
	}, [value]);

	return (
		<div>
			{value && Object.keys(categorized)?.length > 0 && (
				<S.Section>
					<S.SectionTitle>Rules</S.SectionTitle>

					{Object.keys(categorized).map((category) => (
						<div key={category}>
							<S.RuleSet>
								{category} - {categorized[category][0].name} : {categorized[category][0].version}
							</S.RuleSet>
							<S.Rule>
								{categorized[category][0].rules.map((rule) => (
									<S.SectionValue key={rule.name}>
										{rule.name} - {rule.version}
									</S.SectionValue>
								))}
							</S.Rule>
						</div>
					))}
				</S.Section>
			)}
		</div>
	);
};

export default Rules;
