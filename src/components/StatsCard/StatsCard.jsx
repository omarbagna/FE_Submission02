import { Typography } from '@material-tailwind/react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const StatsCard = ({ period, amount, total_orders }) => {
	return (
		<div className="w-full h-full  bg-white/50  grid grid-flow-col grid-cols-4 grid-rows-2 gap-3 justify-center items-center rounded-lg shadow-md p-4">
			<div className="w-full col-span-4 md:col-span-3  flex justify-between items-center capitalize ">
				<Typography
					variant="h6"
					color="orange"
					className="w-2/3 flex justify-start items-center capitalize ">
					{period}
				</Typography>

				<div className="text-2xl w-1/3 h-full flex md:hidden justify-end items-center col-span-1 row-span-2">
					{total_orders > 300 ? (
						<AiOutlineArrowUp className="text-green-300" />
					) : (
						<AiOutlineArrowDown className="text-red-300" />
					)}
				</div>
			</div>

			<Typography
				variant="paragraph"
				className="w-full h-full col-span-3 flex justify-start items-end lg:items-center text-sm md:text-base lg:text-2xl font-light">
				{Intl.NumberFormat('en-GH', {
					style: 'currency',
					currency: 'USD',
				}).format(amount)}{' '}
				/ {total_orders} orders
			</Typography>

			<div className="text-6xl h-full hidden md:flex justify-end items-center col-span-1 row-span-2">
				{total_orders > 300 ? (
					<AiOutlineArrowUp className="text-green-300" />
				) : (
					<AiOutlineArrowDown className="text-red-300" />
				)}
			</div>
		</div>
	);
};

export default StatsCard;
