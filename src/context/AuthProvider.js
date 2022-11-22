import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(
		JSON.parse(localStorage.getItem('userSession'))
	);

	// Save user session to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('userSession');
		if (data !== null) setAuth(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('userSession', JSON.stringify(auth));
	}, [auth]);

	const logout = () => {
		setAuth(null);
		toast.success('You have been logged out successfully', {
			theme: 'colored',
		});
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthProvider = () => useContext(AuthContext);
