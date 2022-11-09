/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { useCallback, useState } from 'react';

import { Add16, Analytics24, Edit24, Email24, NextOutline24, SubtractAlt24, TrashCan24, UserAdmin24 } from '@carbon/icons-react';
import {
	Button,
	DataTable as DTable,
	DataTableSkeleton,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableToolbar,
	TableToolbarContent,
	TableToolbarSearch,
} from 'carbon-components-react';
import { checkExpiresSoon } from '../../utils/index';

import S from './DataTable.styles';

const DataTable = ({
	rows,
	headers,
	title,
	description,
	helpText,
	onRowClickedCallback,
	onCreateCallback,
	onDeleteCallback,
	onRevokeCallback,
	onEditCallback,
	onRefreshCallback,
	onShowAdminsCallback,
	onResendEmailCallback,
	onUtilizationCallback,
	addButtonTitle,
}) => {
	const [{ startIndex, endIndex }, setIndices] = useState({
		startIndex: 0,
		endIndex: 25,
	});

	const getSelectedRowFromCells = useCallback(
		(cells) => {
			if (cells) {
				const findRowById = (_cells) => {
					const idCell = _cells.find((cell) => cell.info.header === 'id');
					const id = idCell.value;
					return rows.find((row) => row.id === id);
				};

				const row = findRowById(cells);
				return row;
			}
			return null;
		},
		[rows],
	);

	const processCell = (cell, cells, data) => {
		const getField = (id, value) => <TableCell key={id}>{value}</TableCell>;

		const getStatusField = (id, value, _cells) => {
			const val = value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : 'Unknown';
			const row = getSelectedRowFromCells(_cells);
			const isExpirySoon = checkExpiresSoon(row.expirationDate);
			const statusIndicator = isExpirySoon && val === 'Active' ? 'expiresSoon' : val;
			const statusText = statusIndicator === 'expiresSoon' ? 'Expires Soon' : val;
			return (
				<TableCell key={id}>
					<S.Status status={statusIndicator} />
					{statusText}
				</TableCell>
			);
		};

		const getActionsField = (_cell, _cells, _data) => (
			<TableCell
				className="actionButtons"
				key={_cell.id}
				onClick={(e) => {
					e.stopPropagation();
				}}
				onKeyPress={(e) => {
					e.stopPropagation();
				}}
			>
				{!!onRowClickedCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`Open ${_data}`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onRowClickedCallback(row);
						}}
					>
						<NextOutline24 aria-label={`Open ${_data}`} />
					</button>
				)}
				{!!onEditCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`${_data} Edit`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onEditCallback(row);
						}}
					>
						<Edit24 aria-label={`${_data} Edit`} />
					</button>
				)}
				{!!onShowAdminsCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`${_data} Administrators`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onShowAdminsCallback(row);
						}}
					>
						<UserAdmin24 aria-label={`${_data} Administrators`} />
					</button>
				)}
				{!!onResendEmailCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`${_data} Resend invitation email`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onResendEmailCallback(row);
						}}
					>
						<Email24 aria-label={`${_data} Resend invitation email`} />
					</button>
				)}
				{!!onUtilizationCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`Show credential scan results for ${_data}`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onUtilizationCallback(row);
						}}
					>
						<Analytics24 aria-label={`Show credential scan results for ${_data}`} />
					</button>
				)}
				{!!onDeleteCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`${_data} Delete`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onDeleteCallback(row);
						}}
					>
						<TrashCan24 aria-label={`${_data} Delete`} />
					</button>
				)}
				{!!onRevokeCallback && (
					<button
						type="button"
						className="rowActionButton"
						title={`${_data} Revoke credential`}
						onClick={() => {
							const row = getSelectedRowFromCells(_cells);
							onRevokeCallback(row);
						}}
					>
						<SubtractAlt24 aria-label={`${_data} Revoke credential`} />
					</button>
				)}
			</TableCell>
		);

		switch (cell.info.header) {
			case 'status':
				return getStatusField(cell.id, cell.value, cells);
			case 'actions':
				return getActionsField(cell, cells, data);
			case 'expirationDate':
			case 'modified': {
				const value = new Date(cell.value).toLocaleString();
				return getField(cell.id, value);
			}
			default:
				return getField(cell.id, cell.value);
		}
	};

	return (
		<S.Table id="dataTableComponent">
			{rows && (
				<DTable rows={rows} headers={headers} isSortable>
					{({ rows: _rows, headers: _headers, getHeaderProps, getRowProps, getTableProps, getToolbarProps, getTableContainerProps, onInputChange }) => (
						<TableContainer title={title} description={description} {...getTableContainerProps()}>
							<S.TableHelpText>{helpText}</S.TableHelpText>
							<TableToolbar {...getToolbarProps()} aria-label={`${title} data table toolbar`}>
								<TableToolbarContent>
									<TableToolbarSearch aria-label={`${title} data table search`} onChange={onInputChange} title="Search" />

									<Button kind="ghost" onClick={onRefreshCallback} title="Refresh">
										<svg
											focusable="false"
											preserveAspectRatio="xMidYMid meet"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											aria-label="Refresh table"
											aria-hidden="true"
											width="16"
											height="16"
											viewBox="0 0 32 32"
											role="img"
											className="bx--btn__icon"
										>
											<path d="M12 10H6.78A11 11 0 0127 16h2A13 13 0 006 7.68V4H4v8h8zM20 22h5.22A11 11 0 015 16H3a13 13 0 0023 8.32V28h2V20H20z" />
										</svg>
									</Button>
									{onCreateCallback && (
										<Button renderIcon={Add16} iconDescription="Add" aria-label={`Add ${addButtonTitle}`} onClick={onCreateCallback}>
											{addButtonTitle}
										</Button>
									)}
								</TableToolbarContent>
							</TableToolbar>
							<Table {...getTableProps()}>
								<TableHead>
									<TableRow>
										{_headers.map((header) => (
											<TableHeader key={header.id} {...getHeaderProps({ header })}>
												{header.header}
											</TableHeader>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{_rows.slice(startIndex, endIndex).map((row) => (
										<TableRow
											key={row.id}
											onClick={() => {
												onRowClickedCallback(getSelectedRowFromCells(row.cells));
											}}
											{...getRowProps({ row })}
										>
											{row.cells.map((cell, index, cells) =>
												processCell(
													cell,
													cells,
													// eslint-disable-next-line no-nested-ternary
													typeof row.cells.filter((b) => b.info.header === 'label')[0]?.value !== 'undefined'
														? row.cells.filter((b) => b.info.header === 'label')[0]?.value
														: typeof row.cells.filter((b) => b.info.header === 'displayName')[0]?.value !== 'undefined'
														? row.cells.filter((b) => b.info.header === 'displayName')[0]?.value
														: row.cells.filter((b) => b.info.header === 'name')[0]?.value,
													row.id,
												),
											)}
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Pagination
								backwardText="Previous page"
								forwardText="Next page"
								itemsPerPageText="Items per page:"
								page={1}
								pageNumberText="Page Number"
								pageSize={25}
								pageSizes={[25, 50, 75, 100]}
								totalItems={_rows.length}
								onChange={({ page, pageSize }) => {
									setIndices({
										startIndex: page * pageSize - pageSize,
										endIndex: page * pageSize,
									});
								}}
							/>
						</TableContainer>
					)}
				</DTable>
			)}

			{!rows && <DataTableSkeleton zebra />}
		</S.Table>
	);
};

export default DataTable;
