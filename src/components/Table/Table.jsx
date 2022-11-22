import {
	ThemeProvider,
	createTheme,
	TableSortLabel,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
} from '@mui/material';

import { Typography } from '@material-tailwind/react';

import { useMemo } from 'react';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import { GlobalFilter } from './GlobalFilter';

const TableComponent = ({
	COLUMNS,
	DATA,
	PAGE_TITLE = null,
	dashboard = false,
}) => {
	const finalTheme = createTheme({
		components: {
			MuiTableCell: {
				styleOverrides: {
					head: {
						backgroundColor: '#F27501',
						color: '#fff',
						'&:nth-of-type(1)': {
							textAlign: 'left',
							width: '30%',
						},
						textAlign: 'center',
						textTransform: 'capitalize',
					},
					body: {
						textTransform: 'capitalize',
						'&:nth-of-type(1)': {
							textAlign: 'left',
						},
						textAlign: 'center',
					},
				},
			},
		},
	});

	const columns = useMemo(() => COLUMNS, [COLUMNS]);
	const data = useMemo(() => DATA, [DATA]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		rows,
		gotoPage,
		setPageSize,
		setFilter,
		state,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useSortBy,
		usePagination
	);

	const { pageIndex, pageSize } = state;

	return (
		<>
			{PAGE_TITLE ? (
				<div className="w-full mb-10 flex justify-between items-center">
					<Typography variant="h4" color="orange" className="capitalize">
						{PAGE_TITLE}
					</Typography>
					<GlobalFilter columns={columns} setFilter={setFilter} />
				</div>
			) : null}

			<ThemeProvider theme={finalTheme}>
				<TableContainer className="bg-white rounded-md">
					<Table aria-label="data table" stickyHeader {...getTableProps()}>
						<TableHead>
							{headerGroups.map((headerGroup) => (
								<TableRow {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<TableCell
											{...column.getHeaderProps(column.getSortByToggleProps())}>
											{column.canSort ? (
												<TableSortLabel
													direction={column.isSortedDesc ? 'desc' : 'asc'}>
													{column.render('Header')}
												</TableSortLabel>
											) : (
												<span>{column.render('Header')}</span>
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableHead>

						<TableBody {...getTableBodyProps()}>
							{page?.map((row, index) => {
								prepareRow(row);
								return (
									<TableRow
										{...row.getRowProps()}
										key={index}
										hover
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
										}}>
										{row.cells.map((cell) => (
											<TableCell {...cell.getCellProps()}>
												{cell.render('Cell')}
											</TableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<div className="hidden lg:flex w-full justify-end lg:px-10">
					{rows.length > 10 && dashboard ? (
						<TablePagination
							rowsPerPageOptions={[5]}
							component="div"
							count={rows.length}
							rowsPerPage={5}
							page={pageIndex}
							onPageChange={(e, page) => gotoPage(page)}
							onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
						/>
					) : (
						rows.length > 10 && (
							<TablePagination
								rowsPerPageOptions={[10, 25, 50]}
								component="div"
								count={rows.length}
								rowsPerPage={pageSize}
								page={pageIndex}
								onPageChange={(e, page) => gotoPage(page)}
								onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
							/>
						)
					)}
				</div>
				<div className="flex lg:hidden w-full justify-end lg:px-10">
					{rows.length > 10 && (
						<TablePagination
							rowsPerPageOptions={[]}
							component="div"
							count={rows.length}
							rowsPerPage={pageSize}
							page={pageIndex}
							onPageChange={(e, page) => gotoPage(page)}
							onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
						/>
					)}
				</div>
			</ThemeProvider>
		</>
	);
};

export default TableComponent;
