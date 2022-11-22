import { format } from 'date-fns';
import { Chip } from '@material-tailwind/react';

export const ORDERSCOLUMNS = [
	{
		Header: 'Product Name',
		accessor: 'product_name',
		disableFilters: true,
	},
	{
		Header: 'Date',
		accessor: 'date',
		disableFilters: true,
		disableSortBy: false,
		Cell: ({ value }) => {
			if (value) {
				return format(new Date(value), 'dd/MM/yyyy');
			}
		},
	},
	{
		Header: 'Price',
		accessor: 'price',
		Cell: ({ value }) => {
			if (value) {
				return Intl.NumberFormat('en-GH', {
					style: 'currency',
					currency: 'USD',
				}).format(value);
			}
		},
	},
	{
		Header: 'Status',
		accessor: 'status',
		Cell: ({ value }) => {
			if (value) {
				return (
					<Chip
						value={value.toUpperCase()}
						className="text-white rounded-full"
						variant="gradient"
						color={value === 1 ? 'green' : 'red'}
					/>
				);
			}
		},
	},
];

export const DASHORDERSCOLUMNS = [
	{
		Header: 'Product Name',
		accessor: 'product.name',
		disableFilters: true,
	},

	{
		Header: 'Price',
		accessor: 'price',
		Cell: ({ value }) => {
			if (value) {
				return Intl.NumberFormat('en-GH', {
					style: 'currency',
					currency: 'USD',
				}).format(value);
			}
		},
	},
	{
		Header: '# Units Sold',
		accessor: 'units',
		disableFilters: true,
	},
	{
		Header: 'Revenue',
		accessor: 'revenue',
		Cell: ({ value }) => {
			if (value) {
				return Intl.NumberFormat('en-GH', {
					style: 'currency',
					currency: 'USD',
				}).format(value);
			}
		},
	},
];
