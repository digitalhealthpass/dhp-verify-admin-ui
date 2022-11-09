/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import S from './ConfigDetailPage.styles';

const Trust = ({ value }) => (
	<div>
		{value && value[0]?.name && (
			<S.Section>
				<S.SectionTitle>Trust</S.SectionTitle>
				<S.SectionValue>
					{value[0].name} - {value[0].version}
				</S.SectionValue>
			</S.Section>
		)}
	</div>
);

export default Trust;
