import React from 'react';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { Loading, Table } from '../components';
import { ORDERSCOLUMNS } from '../data/TableColumns';
import { useQuery } from 'react-query';
import { axiosPrivate } from '../api/axios';

const ORDERS_URL = '/orders?page=1&q=search_term';

const Orders = () => {
	const fetchOrdersData = async () => {
		const response = await axiosPrivate.get(ORDERS_URL);

		return response;
	};

	const { refetch, data, isLoading, isError } = useQuery(
		'orders_data',
		fetchOrdersData
	);

	const ORDERSDATA = data?.data?.orders ? data.data.orders : [];

	return (
		<Card className="w-full h-full bg-white/50">
			<CardBody className="text-center h-full">
				{isLoading ? (
					<Loading />
				) : isError ? (
					<div className="w-full h-full p-4 flex flex-col justify-center items-center gap-8">
						<Typography
							variant="h2"
							color="red"
							className="capitalize cursor-none text-center text-xl md:text-3xl lg:text-4xl">
							failed to fetch data due to token refresh failure. <br />
							please try again or login again to get a new token
						</Typography>

						<Button
							variant="gradient"
							color="orange"
							className="text-base md:text-2xl font-medium"
							onClick={refetch}>
							refetch data
						</Button>
					</div>
				) : (
					<Table
						COLUMNS={ORDERSCOLUMNS}
						DATA={ORDERSDATA}
						PAGE_TITLE="orders"
					/>
				)}
			</CardBody>
		</Card>
	);
};

export default Orders;
