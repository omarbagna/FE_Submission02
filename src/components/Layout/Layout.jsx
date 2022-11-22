import React from 'react';
import { Outlet } from 'react-router-dom';
import { logo } from '../../assets';
import { useStateContext } from '../../context/StateContext';
import SideMenu from '../SideMenu/SideMenu';

const Layout = () => {
	const { expanded } = useStateContext();

	return (
		<div className="relative w-screen h-screen flex flex-col gap-3 lg:gap-1 lg:flex-row justify-center items-center">
			<SideMenu />
			<div
				className={`${
					expanded ? 'lg:pl-[13.3rem]' : 'lg:pl-[9.5rem]'
				} w-full h-full pt-28 lg:pt-2 p-2 flex justify-center items-center`}>
				<Outlet />
			</div>

			<img
				alt="logo"
				src={logo}
				className="fixed -bottom-5 -right-8 object-contain w-40 opacity-10 -z-10"
			/>
		</div>
	);
};

export default Layout;
