import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context/AuthProvider';
import { StateContext } from './context/StateContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';

import { ThemeProvider } from '@material-tailwind/react';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnmount: false,
			refetchOnReconnect: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<BrowserRouter>
				<StateContext>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</StateContext>
				<ToastContainer />
			</BrowserRouter>
		</AuthProvider>
		<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
	</QueryClientProvider>
);
