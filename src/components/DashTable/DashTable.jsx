import {
	Card,
	CardBody,
	CardHeader,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import { DASHORDERSCOLUMNS } from '../../data/TableColumns';
import TableComponent from '../Table/Table';

const DashTable = ({ data = [] }) => {
	return (
		<Card className="w-full h-full bg-white/50">
			<CardHeader
				floated={false}
				className="flex justify-center items-center p-4 bg-[#F27501]">
				<Typography variant="h5" color="white" className="capitalize">
					best sellers
				</Typography>
			</CardHeader>
			<CardBody className="text-center h-full">
				<TableComponent COLUMNS={DASHORDERSCOLUMNS} DATA={data} dashboard />
			</CardBody>
		</Card>
	);
};

export default DashTable;
