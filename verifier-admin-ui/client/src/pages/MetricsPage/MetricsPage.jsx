/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { SimpleBarChart } from '@carbon/charts-react';
import { Button, DatePicker, DatePickerInput } from 'carbon-components-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Export16 } from '@carbon/icons-react';
import moment from 'moment';
import { CSVDownload } from 'react-csv';
import { v4 as uuid } from 'uuid';

import BackButton from '../../components/BackButton/BackButton';
import { useAppContext } from '../../hooks/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import { queryMetrics } from '../../services/dataService';

import S from './Metrics.styles';

import PageHeader from '../../components/PageHeader/PageHeader';
import { CUST_PATH, LANDING_PATH, METRICS_PATH, ORG_PATH } from '../../constants/paths';
import { addAltText, changeIdByPtag, changeRoleByDiv, changeRoleBySpan, changeRoleByUnorderedList, listenByButton } from '../../utils/changeAtrribute';

const initialStartDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
const initialEndDate = moment().format('YYYY-MM-DD');

const csvHeaders = [
	{ label: 'Count', key: 'count' },
	{ label: 'Credential Type', key: 'credentialType' },
	{ label: 'Scan Results', key: 'scanResult' },
	{ label: 'Issuer', key: 'issuerName' },
];

const baseChartOptions = {
	title: 'Title',
	axes: {
		left: {
			mapsTo: 'value',
		},
		bottom: {
			mapsTo: 'group',
			scaleType: 'labels',
		},
	},
	height: '300px',
};

const MetricsPage = () => {
	const { user, logout } = useAuth();
	const { getAppContext, clearCustContext, clearOrgContext } = useAppContext();
	const [dateRange, setDateRange] = useState({
		startDate: initialStartDate,
		endDate: initialEndDate,
	});
	const [metricsData, setMetricsData] = useState([]);
	const [filters] = useState({ credentialType: {}, scanResult: {} });
	const [filteredMetricsData, setFilteredMetricsData] = useState([]);
	const [chartData, setChartData] = useState();
	const [exportData, setExportData] = useState(false);

	const [customerName, setCustomerName] = useState();
	const [customerId, setCustomerId] = useState();
	const [organizationId, setOrganizationId] = useState();
	const [organizationName, setOrganizationName] = useState();

	const navigate = useNavigate();
	const { state } = useLocation();
	const [returnPath] = useState(state?.returnPath);

	const { t } = useTranslation();
	const START_DATE = t('METRICS_PAGE:startDate');
	const END_DATE = t('METRICS_PAGE:endDate');
	const HELP_TEXT = t('METRICS_PAGE:helpText');
	const LBL_TIME_RANGE = t('METRICS_PAGE:timeRangeLbl');
	const NO_DATA = t('METRICS_PAGE:noData');
	const PAGE_TITLE = t('METRICS_PAGE:pageTitle', {
		custName: organizationName || customerName,
	});

	const csvReport = {
		filename: 'Report.csv',
		headers: csvHeaders,
		data: metricsData,
	};

	const onExecuteQuery = useCallback(() => {
		const { startDate, endDate } = dateRange;
		if (startDate && endDate && customerId) {
			const startMoment = moment(startDate);
			const startDateStr = startMoment.clone().startOf('day').toISOString();
			const endMoment = moment(endDate);
			const endDateStr = endMoment.clone().endOf('day').toISOString();

			queryMetrics(customerId, organizationId, {
				selectors: {
					startDate: startDateStr,
					endDate: endDateStr,
					customerId,
					orgId: organizationId !== -1 ? organizationId : null,
				},
				groupBy: {
					credentialType: true,
					issuerName: true,
					scanResult: true,
				},
			}).then(
				(response) => {
					const responseData = response.data.result.groupBy;
					const data = responseData.map((item) => ({ ...item, id: uuid() }));
					setMetricsData(data);
				},
				(error) => {
					if (error.status === 401 || error.status === 403) {
						logout({ redirect: METRICS_PATH });
					}
				},
			);
		}
	}, [customerId, dateRange, organizationId, logout]);

	const onDateChange = useCallback(
		(event) => {
			if (event.length === 2) {
				const startDate = moment(event[0]).format('YYYY-MM-DD');
				const endDate = moment(event[1]).format('YYYY-MM-DD');

				if (dateRange.startDate !== startDate || dateRange.endDate !== endDate) {
					setDateRange({ startDate, endDate });
				}
			}
		},
		[dateRange],
	);

	useEffect(() => {
		document.title = PAGE_TITLE;
	}, [PAGE_TITLE]);

	useEffect(() => {
		setTimeout(() => {
			changeIdByPtag();
			changeRoleByDiv();
			changeRoleByUnorderedList();
			changeRoleBySpan();
		}, 500);

		const checkboxes = document.getElementsByClassName('legend-item');
		for (let i = 0; i < checkboxes.length; i += 1) {
			checkboxes[i].addEventListener('click', changeRoleByDiv);
		}

		if (document.getElementsByClassName('bx--overflow-menu__trigger').length !== 0) {
			document.getElementsByClassName('bx--overflow-menu__trigger')[3].addEventListener('click', changeIdByPtag);
			document.getElementsByClassName('bx--overflow-menu__trigger')[6].addEventListener('click', changeIdByPtag);
		}

		const menus = document.getElementsByClassName('toolbar-control bx--overflow-menu');
		for (let i = 0; i < menus.length; i += 1) {
			if (menus[i].getAttribute('aria-label') === 'Show as table') {
				menus[i].addEventListener('click', changeIdByPtag);
			}
		}
	});

	useEffect(() => {
		// console.log(getAppContext());
		const { custName, custId, orgId, orgName } = getAppContext();

		const cId = user.customerId || custId || -1;
		const cName = user.customerName || custName || undefined;
		const oId = user.orgId || orgId || -1;
		const oName = user.orgName || orgName || undefined;

		setCustomerId(cId);
		setCustomerName(cName);
		setOrganizationId(oId);
		setOrganizationName(oName);

		if (!cId || cId === -1) {
			navigate(LANDING_PATH);
		}

		onExecuteQuery();
	}, [navigate, getAppContext, user, dateRange, onExecuteQuery]);

	useEffect(() => {
		if (chartData) {
			setTimeout(() => {
				listenByButton();
			}, 1000);
		}
	}, [chartData]);

	useEffect(() => {
		let filterResult;

		if (metricsData.length > 0) {
			const filterKeys = Object.keys(filters);

			const filterValues = filterKeys.map((filterKey) => {
				const type = filters[filterKey];
				const typeKeys = Object.keys(type);
				return typeKeys.filter((typeKey) => type[typeKey]);
			});

			const filterObject = {};
			filterKeys.forEach((key, i) => {
				filterObject[key] = filterValues[i];
			});
			Object.keys(filterObject).forEach((k) => filterObject[k].length === 0 && delete filterObject[k]);

			filterResult = metricsData.filter((dataItem) => (filterObject.credentialType ? !!filterObject.credentialType.includes(dataItem.credentialType) : true));
			filterResult = filterResult.filter((dataItem) => (filterObject.scanResult ? !!filterObject.scanResult.includes(dataItem.scanResult) : true));

			// const filteredCount = filterResult.reduce((acc, row) => { return acc += row.count }, 0)

			// setFilteredResultCount(filteredCount)
			setFilteredMetricsData(filterResult);
		} else {
			// setFilteredResultCount(0)
			setFilteredMetricsData([]);
		}
	}, [filters, metricsData]);

	useEffect(() => {
		const getAllValuesForField = (inputArray, fieldName) => {
			const outputArray = [];

			inputArray.forEach((item) => {
				if (!item[fieldName] && !outputArray.includes('Unknown')) {
					outputArray.push('Unknown');
				}
				if (item[fieldName] && !outputArray.includes(item[fieldName])) {
					outputArray.push(item[fieldName]);
				}
			});

			return outputArray;
		};

		const countGroupsByField = (inputArray, fieldName) => {
			const outputArray = [];

			inputArray.forEach((type) => {
				const filterType = filteredMetricsData.filter((item) => (item[fieldName] || 'Unknown') === type);
				const filteredTypeCount = filterType.reduce((acc, item) => {
					// eslint-disable-next-line no-param-reassign
					acc += item.count;
					return acc;
				}, 0);
				outputArray.push({ group: type, value: filteredTypeCount });
			});

			return outputArray;
		};

		if (!filteredMetricsData) {
			return;
		}
		const credentialTypes = getAllValuesForField(filteredMetricsData, 'credentialType');
		const scanResultTypes = getAllValuesForField(filteredMetricsData, 'scanResult');
		const issuers = getAllValuesForField(filteredMetricsData, 'issuerName');

		const credTypeData = countGroupsByField(credentialTypes, 'credentialType');
		const scanResultData = countGroupsByField(scanResultTypes, 'scanResult');
		const issuerData = countGroupsByField(issuers, 'issuerName');

		const newChartData = credTypeData.length + scanResultData.length + issuerData.length > 0 ? { credTypeData, scanResultData, issuerData } : undefined;
		setChartData(newChartData);

		setTimeout(() => {
			addAltText(countGroupsByField(credentialTypes, 'credentialType'), 'credTypeData');
			addAltText(countGroupsByField(scanResultTypes, 'scanResult'), 'scanResult');
			addAltText(countGroupsByField(issuers, 'issuerName'), 'issuerName');
			listenByButton();
		}, 1000);
	}, [filteredMetricsData]);

	useEffect(() => {
		if (exportData) {
			setExportData(false);
		}
	}, [exportData]);

	const onBackHandler = useCallback(() => {
		if (returnPath === ORG_PATH) {
			clearOrgContext();
		}
		if (returnPath === CUST_PATH) {
			clearCustContext();
		}

		navigate(returnPath);
	}, [navigate, clearCustContext, clearOrgContext, returnPath]);

	return (
		<S.Page id="metricsPage">
			<PageHeader>
				<BackButton callback={onBackHandler} />
			</PageHeader>

			<S.ResultPanel id="metricsPageResults">
				<S.ResultTable>
					<S.PageTitle>{PAGE_TITLE}</S.PageTitle>
					<S.HelpText>{HELP_TEXT}</S.HelpText>

					<S.Row>
						<S.FilterLabel>{LBL_TIME_RANGE}</S.FilterLabel>
						<S.Column>
							<DatePicker id="__auto_datepicker" dateFormat="Y-m-d" datePickerType="range" onChange={onDateChange}>
								<DatePickerInput value={dateRange.startDate} id="date-picker-range-start" labelText={START_DATE} type="text" />
								<DatePickerInput value={dateRange.endDate} id="date-picker-range-end" labelText={END_DATE} type="text" />
							</DatePicker>
							<Button
								className="__auto_export_btn export_btn"
								kind="tertiary"
								size="sm"
								renderIcon={Export16}
								onClick={() => {
									changeRoleByDiv();
									setExportData(true);
								}}
							>
								Export to CSV
							</Button>
						</S.Column>
					</S.Row>
				</S.ResultTable>
				<S.ResultBreakdown className="__auto_metrics_charts">
					{!chartData && <div>{NO_DATA}</div>}

					{chartData?.credTypeData?.length > 0 && <SimpleBarChart data={chartData.credTypeData} options={{ ...baseChartOptions, title: 'Credential Types' }} />}
					{chartData?.scanResultData?.length > 0 && <SimpleBarChart data={chartData.scanResultData} options={{ ...baseChartOptions, title: 'Scan Results' }} />}
					{chartData?.issuerData?.length > 0 && <SimpleBarChart data={chartData.issuerData} options={{ ...baseChartOptions, title: 'Issuer' }} />}
				</S.ResultBreakdown>
			</S.ResultPanel>

			{exportData && <CSVDownload {...csvReport}>Export to CSV</CSVDownload>}
		</S.Page>
	);
};

export default MetricsPage;
