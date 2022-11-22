import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
//import { RequireAuth } from 'react-auth-kit';
import { Layout, Loading } from './components';
import { Login, Dashboard, Orders } from './pages';
import PrivateRoutes from './utils/PrivateRoutes';

const App = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route element={<PrivateRoutes />} exact>
					<Route path="/" element={<Layout />} exact>
						<Route index element={<Dashboard />} />
						<Route path="/" element={<Dashboard />} />
						<Route path="orders" element={<Orders />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
