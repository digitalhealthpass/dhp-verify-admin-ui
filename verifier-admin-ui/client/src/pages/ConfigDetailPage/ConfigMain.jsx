/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useEffect, useState } from 'react';

import Rules from './Rules';
import Trust from './Trusts';
import Display from './Display';

import S from './ConfigDetailPage.styles';

const ConfigMain = ({ values }) => {
	const [display, setDisplay] = useState();
	const [rules, setRules] = useState();
	const [trusts, setTrusts] = useState();

	useEffect(() => {
		if (values) {
			setDisplay(values.display);
			setRules(values['rule-sets']);
			setTrusts(values['trust-lists']);
		}
	}, [values]);

	return (
		<S.ConfigMainSection>
			<S.ConfigMain tabIndex={0}>
				{rules && <Rules value={rules} />}
				{trusts && <Trust value={trusts} />}
				{display && <Display values={display} />}
			</S.ConfigMain>
		</S.ConfigMainSection>
	);
};

export default ConfigMain;
