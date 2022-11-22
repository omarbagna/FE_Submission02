import { Navigate, Outlet } from 'react-router-dom';
import { useAuthProvider } from '../context/AuthProvider';

const PrivateRoutes = () => {
	const { auth } = useAuthProvider();

	return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
