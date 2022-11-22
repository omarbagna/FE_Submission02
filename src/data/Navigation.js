import { TbLayoutDashboard } from 'react-icons/tb';
import { FiShoppingBag } from 'react-icons/fi';

export const NavOptions = [
	{
		id: 1,
		name: 'dashboard',
		icon: <TbLayoutDashboard />,
		route: '/',
	},
	{
		id: 2,
		name: 'orders',
		icon: <FiShoppingBag />,
		route: '/orders',
	},
];
