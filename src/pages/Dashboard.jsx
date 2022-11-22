import { Button, Typography } from '@material-tailwind/react';
import { GiPumpkinMask } from 'react-icons/gi';
import { useQuery } from 'react-query';
import { DashChart, DashTable, Loading, StatsCard } from '../components';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const DASHBOARD_URL = '/dashboard';

const hours = new Date().getHours();
let greet;

const Dashboard = () => {
	const axiosPrivate = useAxiosPrivate();

	//let accessToken = auth?.accessToken;

	if (hours < 12) greet = 'morning';
	else if (hours >= 12 && hours < 16) greet = 'afternoon';
	else if (hours >= 16 && hours <= 24) greet = 'evening';

	//const { decodedToken, isExpired } = useJwt(auth.accessToken);

	const fetchDashboardData = async () => {
		const response = await axiosPrivate.get(DASHBOARD_URL);

		return response;
	};

	const { refetch, data, isLoading, isError } = useQuery(
		'dashboard_data',
		fetchDashboardData
	);

	const TABLEDATA = data?.data?.dashboard?.bestsellers
		? data.data.dashboard.bestsellers
		: [];

	const WEEKDATA = data?.data?.dashboard?.sales_over_time_week
		? data.data.dashboard.sales_over_time_week
		: [];

	const YEARDATA = data?.data?.dashboard?.sales_over_time_year
		? data.data.dashboard.sales_over_time_year
		: [];

	console.log(isError);

	return (
		<div className="w-full h-full flex flex-col gap-4 justify-start items-center">
			<div className="relative w-full p-14 flex justify-center items-center rounded-lg shadow-xl bg-[#F27501] overflow-hidden">
				<Typography
					variant="h1"
					color="white"
					className="capitalize cursor-none font-medium text-3xl md:text-5xl">
					good {greet}
				</Typography>

				<GiPumpkinMask className="absolute -left-5 -top-5 text-7xl lg:text-9xl opacity-20 text-white" />
				<GiPumpkinMask className="absolute -right-5 -bottom-7 text-7xl lg:text-9xl opacity-20 text-white" />
			</div>

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
				<>
					<div className="w-full grid grid-cols-3 place-items-center gap-1 md:gap-2 lg:gap-3">
						<StatsCard period="today" amount={1214} total_orders={200} />
						<StatsCard period="last week" amount={1214} total_orders={600} />
						<StatsCard period="last month" amount={1214} total_orders={250} />
					</div>

					<div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
						<DashChart weekData={WEEKDATA} yearData={YEARDATA} />
						<DashTable data={TABLEDATA} />
					</div>
				</>
			)}
		</div>
	);
};

export default Dashboard;
