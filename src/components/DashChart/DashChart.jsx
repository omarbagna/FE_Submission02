import { useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Typography,
} from '@material-tailwind/react';
import { Switch } from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const DashChart = ({ weekData, yearData }) => {
	const [checked, setChecked] = useState(false);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Card className="w-full h-full bg-white/50">
			<CardHeader
				floated={false}
				className="flex justify-between items-center p-4 bg-[#F27501]">
				<Typography variant="h5" color="white" className="capitalize">
					{`Revenue (Last ${checked ? '12 months' : '7 days'})`}
				</Typography>

				<Switch
					color="default"
					checked={checked}
					onChange={handleChange}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</CardHeader>
			<CardBody className="text-center h-5/6">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={400}
						height={300}
						data={Object.values(checked ? yearData : weekData)}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="orders" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="total" fill="#F6914B" radius={[15, 15, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</CardBody>
		</Card>
	);
};

export default DashChart;
