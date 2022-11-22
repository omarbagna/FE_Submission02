import { Typography } from '@material-tailwind/react';
import React from 'react';
import { logo } from '../../assets';

const Loading = () => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex flex-col gap-8 justify-center items-center bg-black/70 backdrop-blur-md z-50">
			<img
				alt="logo"
				src={logo}
				className="object-contain w-1/3 animate-bounce"
			/>

			<Typography variant="h2" color="orange" className="animate-pulse">
				Loading Data
			</Typography>
		</div>
	);
};

export default Loading;
