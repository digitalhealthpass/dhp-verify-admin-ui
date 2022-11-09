/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import ValueEditButton from '../ValueEditButton/ValueEditButton';

import S from '../../pages/VerifierConfigDetailsPage/VerifierConfigDetailPage.styles';

const ValueSetItemDetail = ({ title, value, type, editable, onClickCallback }) => {
	const renderItems = () => {
		if (!value) return null;

		if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
			const specs = Object.keys(value);

			return (
				<>
					{specs.map((spec) => (
						<div key={spec} className="vsSpecName">
							{spec}
							<div>
								{value[spec].map((rule) => (
									<li key={rule}>{rule}</li>
								))}
							</div>
						</div>
					))}
				</>
			);
		}

		if (Array.isArray(value)) {
			const itemsToRender = value.map((item) => {
				const { value: itemValue, description } = item;

				if (description?.length > 0) {
					return (
						<span key={itemValue}>
							{itemValue} - {description}
						</span>
					);
				}
				return <span key={itemValue}>{itemValue}</span>;
			});
			return itemsToRender;
		}

		if (type === 'link') {
			return (
				<a href={value} target="_blank" rel="noreferrer" className="vsPlainText">
					{value}
				</a>
			);
		}
		return <div className="vsPlainText">{value}</div>;
	};

	return (
		<>
			{value && (
				<S.Section>
					<S.SectionTitle>
						{title}
						{editable && <ValueEditButton onClickCallback={onClickCallback} />}
					</S.SectionTitle>
					<S.SectionValue>{renderItems()}</S.SectionValue>
				</S.Section>
			)}
			{!value && <> </>}
		</>
	);
};

export default ValueSetItemDetail;
