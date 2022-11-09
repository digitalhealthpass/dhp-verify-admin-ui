/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
// TODO: the code quality here is poor and this should be re-written correctly

export const getCheckedValues = (verifierConfig) => {
	const { expanded } = verifierConfig || {};
	const { specificationConfigurations } = expanded || [];
	/* Onload enabling of checkbox */
	/* Creating Credential Category List */

	if (verifierConfig) {
		const credentialCategoryArr = [];

		specificationConfigurations.forEach((arr) => {
			if (!credentialCategoryArr.includes(arr.credentialCategoryDisplayValue)) {
				credentialCategoryArr.push(arr.credentialCategoryDisplayValue);
			}
		});

		let treeModel = [
			credentialCategoryArr.map((credentialCategory) => ({
				value: credentialCategory,
				label: credentialCategory,
				...[credentialCategory],
			})),
		];
		treeModel[0].map((data) => delete data[0]);
		treeModel = treeModel[0];

		/* Creating Specification Configuration List */
		treeModel.map((specificationCategory) =>
			specificationConfigurations.forEach((specificationData) => {
				if (specificationData.credentialCategoryDisplayValue === specificationCategory.value) {
					if (!specificationCategory?.children) {
						specificationCategory.children = [];
					}

					specificationCategory.children.push({
						value: `${specificationData.credentialCategory}:${specificationData.id}`,
						label: specificationData.credentialSpecDisplayValue,
						specificationName: specificationData.name,
						specID: specificationData.id,
					});
				}
			}),
		);

		/* Creating Rules List */
		treeModel.map((specificationCategory) =>
			specificationCategory.children.forEach((specificationData) => {
				const { rules } = specificationConfigurations.filter((specConfig) => specConfig.name === specificationData.specificationName)[0];

				if (!specificationData?.children && rules.length > 0) {
					specificationData.children = [];
				}

				if (rules.length > 0) {
					rules.map((rule) =>
						specificationData.children.push({
							value: `${specificationData.specificationName}:${rule.id}`,
							label: rule.name,
							specID: specificationData.specID,
							ruleID: rule.id,
						}),
					);
				}
			}),
		);

		/* Creating Rules List for enabling checkbox with disabledRules */
		const rulesArr = [];

		treeModel.map(
			(specificationCategory) =>
				specificationCategory.children &&
				specificationCategory.children.map(
					(specificationData) =>
						specificationData.children &&
						specificationData.children.map((rule) =>
							expanded.disabledRules.forEach((data) => {
								if (data.id === rule.ruleID && data.specID === rule.specID) {
									rulesArr.push(rule.value);
								}
							}),
						),
				),
		);

		rulesArr.map((data) =>
			treeModel.map(
				(specificationCategory) =>
					specificationCategory.children &&
					specificationCategory.children.map(
						(specificationData) =>
							specificationData.children &&
							specificationData.children.forEach((rule, i) => {
								if (rule.value === data) {
									specificationData.children.splice(i, 1);
								}
							}),
					),
			),
		);

		/* Creating Specification Config List for enabling checkbox with disabledSpecifications */
		const specArr = [];

		treeModel.map(
			(specificationCategory) =>
				specificationCategory.children &&
				specificationCategory.children.map((specificationData) =>
					verifierConfig.expanded.disabledSpecifications.forEach((dat) => {
						if (specificationData.value.includes(dat.id)) {
							specArr.push(specificationData.value);
						}
					}),
				),
		);

		specArr.map((specData) =>
			treeModel.map(
				(specificationCategory) =>
					specificationCategory.children &&
					specificationCategory.children.forEach((specificationData) => {
						if (specificationData.value === specData) {
							specificationData.value = '';
						}
					}),
			),
		);

		/* Merging both Rules list and Specifcation Config ID's to enable checkbox to treeArr */
		const treeArr = [];

		treeModel.map(
			(specificationCategory) =>
				specificationCategory.children &&
				specificationCategory.children.map((specificationData) => specificationData.children && specificationData.children.map((rule) => treeArr.push(rule.value))),
		);

		treeModel.map(
			(specificationCategory) =>
				specificationCategory.children && specificationCategory.children.map((specificationData) => specificationData?.value !== '' && treeArr.push(specificationData.value)),
		);

		return treeArr;
	}
};

export const verifierConfigToTreeModel = (verifierConfig) => {
	const { expanded } = verifierConfig || {};
	const { specificationConfigurations } = expanded || [];

	/* Creating data structure for Checkboxtree component */
	/* Creating Credential Category List */
	if (verifierConfig) {
		const credentialCategoryArr = [];
		specificationConfigurations.forEach((arr) => {
			if (!credentialCategoryArr.includes(arr.credentialCategoryDisplayValue)) {
				credentialCategoryArr.push(arr.credentialCategoryDisplayValue);
			}
		});
		let treeModel = [
			credentialCategoryArr.map((credentialCategory) => ({
				value: credentialCategory,
				label: credentialCategory,
				showCheckbox: false,
				...[credentialCategory],
			})),
		];
		treeModel[0].map((data) => delete data[0]);
		treeModel = treeModel[0];

		/* Creating Specification Configuration List */
		treeModel.map((specificationCategory) =>
			specificationConfigurations.forEach((specificationData) => {
				if (specificationData.credentialCategoryDisplayValue === specificationCategory.value) {
					if (!specificationCategory?.children) {
						specificationCategory.children = [];
					}

					specificationCategory.children.push({
						value: `${specificationData.credentialCategory}:${specificationData.id}`,
						label: specificationData.credentialSpecDisplayValue,
						specificationName: specificationData.name,
						specID: specificationData.id,
					});
				}
			}),
		);

		/* Creating Rules List */
		treeModel.map((specificationCategory) =>
			specificationCategory.children.forEach((specificationData) => {
				const { rules } = specificationConfigurations.filter((e) => e.name === specificationData.specificationName)[0];

				if (!specificationData?.children && rules.length > 0) {
					specificationData.children = [];
				}

				if (rules.length > 0) {
					rules.map((rule) =>
						specificationData.children.push({
							value: `${specificationData.specificationName}:${rule.id}`,
							label: rule.name,
							specID: specificationData.specID,
							ruleID: rule.id,
						}),
					);
				}
			}),
		);

		return treeModel;
	}
};

export const treeModelToVerifierConfig = (verifierConfig, checked) => {
	const { expanded } = verifierConfig || {};
	const { specificationConfigurations } = expanded || [];

	if (verifierConfig) {
		/* Creating Disabled rules List */
		const selectedRules = [];
		const selectedRuleID = [];

		/* Getting Rules List with '-' */
		checked.forEach((checkValue) => {
			const colanIndex = checkValue.indexOf(':');
			const rule = checkValue.slice(0, colanIndex);
			if (rule.indexOf('-') !== -1) {
				selectedRules.push(checkValue);
			}
		});

		/* Getting ID and Spec Name with ':' */
		selectedRules.forEach((selectedRule) => {
			const colanIndex = selectedRule.indexOf(':');
			const ruleId = selectedRule.slice(colanIndex + 1, selectedRule.length);
			const specName = selectedRule.slice(0, colanIndex);
			selectedRuleID.push({
				id: ruleId,
				specName,
			});
		});

		/* Getting Specification ID */
		selectedRuleID.forEach((selectedRule) => {
			specificationConfigurations.forEach((specConfig) => {
				if (selectedRule.specName === specConfig.name) {
					selectedRule.specID = specConfig.id;
					delete selectedRule.specName;
				}
			});
		});

		const completeVerifierRules = [];
		specificationConfigurations.forEach((specConfig) => {
			specConfig.rules.forEach((rule) => {
				completeVerifierRules.push({
					id: rule.id,
					specID: specConfig.id,
				});
			});
		});

		/* Finding Difference Between Whole list of rules and selected rules */
		const disableRules = completeVerifierRules.filter((verifierRule) => !selectedRuleID.some((selectedRule) => verifierRule.id === selectedRule.id && verifierRule.specID === selectedRule.specID));

		/* Creating Disabled Specification List */
		const selectedSpecification = [];
		const selectedSpecificationID = [];
		const disableSpecification = [];
		/* Getting Specification List with ':' */

		checked.forEach((checkValue) => {
			const colanIndex = checkValue.indexOf(':');
			const rule = checkValue.slice(0, colanIndex);
			if (rule.indexOf('-') === -1 && checkValue.indexOf(':') !== -1) {
				selectedSpecification.push(checkValue);
			}
		});

		/* Getting ID with ':' */
		selectedSpecification.forEach((selectedSpec) => {
			const colanIndex = selectedSpec.indexOf(':');
			const specId = selectedSpec.slice(colanIndex + 1, selectedSpec.length);
			selectedSpecificationID.push(specId);
		});

		specificationConfigurations.forEach((selectedSpec) => {
			if (!selectedSpecificationID.includes(selectedSpec.id)) {
				disableSpecification.push({
					id: `${selectedSpec.id}`,
				});
			}
		});

		let count = 0;
		disableSpecification.map((disSpec) =>
			specificationConfigurations.forEach((specConfig) => {
				if (disSpec.id === specConfig.id) {
					specConfig.rules.forEach((rule) => {
						selectedRuleID.forEach((selectedRule) => {
							if (selectedRule.id === rule.id && selectedRule.specID === specConfig.id) {
								count += 1;
							}
						});
					});
				}
			}),
		);

		const disabledData = {
			disabledSpecifications: disableSpecification,
			disabledRules: disableRules,
			invalidRules: count > 0,
		};

		return disabledData;
	}
};
