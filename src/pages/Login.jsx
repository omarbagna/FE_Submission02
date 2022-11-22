import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Button,
} from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
//import { useSignIn } from 'react-auth-kit';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { InputBox } from '../components';
import { useAuthProvider } from '../context/AuthProvider';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/login';

const Login = () => {
	const navigate = useNavigate();

	const { setAuth } = useAuthProvider();
	const [loginError, setLoginError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { handleSubmit, control } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const handleLogin = async (data) => {
		setIsLoading(true);

		try {
			const response = await axios.post(LOGIN_URL, JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			//console.log(JSON.stringify(response));
			const accessToken = response?.data?.access_token;
			const refreshToken = response?.data?.refresh_token;
			setAuth({ accessToken: accessToken, refreshToken: refreshToken });
			setIsLoading(false);
			setLoginError(false);
			toast.success('Welcome to your dashboard', {
				theme: 'colored',
			});
			navigate('/', { replace: true });
		} catch (err) {
			let errMessage;
			if (!err?.response) {
				errMessage = 'No Server Response';
			} else if (err.response?.status === 400 || err.response?.status === 401) {
				errMessage = 'Invalid Username or Password';
			} else {
				errMessage = 'Login Failed';
			}

			toast.error(errMessage, { theme: 'colored' });
			setLoginError(true);
			setIsLoading(false);
		}
	};

	return (
		<div className="relative w-screen h-screen flex justify-center items-center overflow-hidden">
			<div className="z-0 md:w-full h-full flex justify-center items-center overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1634184944338-7a5abb630f9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
					alt="login"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="absolute z-10 w-4/5 md:w-1/2 xl:w-1/3 h-full flex flex-col justify-center  items-center">
				<div className="w-full h-fit px-3 md:px-5 lg:px-16 xl:px-20">
					<Card className="w-full h-fit bg-white/90 backdrop-blur-sm">
						<CardHeader
							className="flex items-center bg-[#434DF9] justify-center uppercase p-3"
							variant="gradient"
							floated={false}
							color="orange">
							<Typography
								variant="h5"
								color="white"
								className="text-base text-center lg:text-xl">
								freddy's artisanal halloween candy shop
							</Typography>
						</CardHeader>
						<CardBody className="flex flex-col gap-4 justify-start items-center">
							{isLoading ? (
								<span className="w-full h-full text-4xl flex justify-center items-center">
									<AiOutlineLoading3Quarters className="animate-spin" />
								</span>
							) : (
								<form
									className="flex flex-col justify-center items-center gap-6 w-full"
									onSubmit={handleSubmit(handleLogin)}>
									<Controller
										control={control}
										name="username"
										rules={{
											required: 'Please enter username to Login',
										}}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => (
											<InputBox
												{...field}
												ref={ref}
												error={invalid || loginError}
												helpertext={invalid ? error.message : null}
												name="username"
												label="Username"
												type="text"
												required
											/>
										)}
									/>
									<Controller
										control={control}
										name="password"
										rules={{
											required: 'Please enter Password',
										}}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => (
											<InputBox
												{...field}
												ref={ref}
												error={invalid || loginError}
												helpertext={invalid ? error.message : null}
												name="password"
												label="Password"
												type="password"
												required
											/>
										)}
									/>

									<Button color="orange" variant="gradient" type="submit">
										login
									</Button>
								</form>
							)}
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Login;
