import { logo } from '../../assets';
import { HiOutlineMenuAlt4, HiOutlineLogin } from 'react-icons/hi';
import {
	TbLayoutSidebarLeftExpand,
	TbLayoutSidebarRightExpand,
} from 'react-icons/tb';
import { Link, NavLink } from 'react-router-dom';
import { NavOptions } from '../../data/Navigation';
import { useStateContext } from '../../context/StateContext';
import { useAuthProvider } from '../../context/AuthProvider';

const SideMenu = () => {
	const { logout } = useAuthProvider();
	const { expanded, handleExpansion } = useStateContext();

	const inActiveStyle = `transition-all duration-150 ease-in flex gap-1 text-xl md:text-2xl items-center w-fit lg:w-full lg:hover:text-[#F27501] ${
		expanded ? 'lg:text-3xl justify-start' : 'lg:text-4xl justify-center'
	}`;

	const activeStyle = `flex gap-1 items-center w-fit lg:w-full bg-[#F27501] text-xl md:text-2xl rounded-xl p-2 text-white shadow-md ${
		expanded ? 'lg:text-3xl justify-start' : 'lg:text-4xl justify-center'
	}`;

	return (
		<div className="fixed top-0 left-0 z-10 w-full h-20 p-2 lg:w-fit lg:h-full flex justify-center items-center">
			<div className="transition-all duration-150 ease-in w-full rounded-lg h-20 px-5 lg:px-7 lg:py-8 lg:w-fit lg:h-full bg-[#eeeeee] shadow-lg  flex lg:flex-col justify-between lg:justify-start items-center lg:gap-10">
				<Link to="/" className="w-fit">
					<img
						alt="logo"
						src={logo}
						className={`transition-all duration-150 ease-in object-contain w-10 md:w-14 ${
							expanded ? 'lg:w-24' : 'lg:w-16'
						}`}
					/>
				</Link>

				{NavOptions.map(({ id, name, icon, route }) => (
					<NavLink
						key={id}
						to={route}
						className={({ isActive }) =>
							isActive ? activeStyle : inActiveStyle
						}>
						{icon}
						{expanded ? (
							<p className="hidden lg:flex capitalize text-xl ">{name}</p>
						) : null}
					</NavLink>
				))}

				<div
					onClick={logout}
					className={`transition-all duration-150 ease-in cursor-pointer flex gap-1 items-center w-fit lg:w-full bg-red-300 lg:hover:bg-red-500 hover:shadow-lg rounded-xl p-2 text-white text-xl md:text-2xl shadow-md ${
						expanded
							? 'lg:text-3xl justify-start'
							: 'lg:text-4xl justify-center'
					}`}>
					<HiOutlineLogin />
					{expanded ? (
						<p className="capitalize text-xl hidden lg:flex">logout</p>
					) : null}
				</div>

				<div className="transition-all duration-150 ease-in w-full h-full hidden lg:flex justify-center items-end text-4xl">
					<div className="rounded-lg w-fit bg-white/40 shadow-lg p-1 cursor-pointer">
						{expanded ? (
							<div
								className="w-fit flex shrink-0 gap-1 justify-center items-center "
								onClick={handleExpansion}>
								<TbLayoutSidebarRightExpand className="shrink-0" />
								<p className="capitalize text-base leading-none">show less</p>
							</div>
						) : (
							<TbLayoutSidebarLeftExpand
								className="shrink-0"
								onClick={handleExpansion}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
