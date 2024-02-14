import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from 'pages/error';
import { store } from 'shared/redux/store';
import { Provider } from 'react-redux';
import Header from 'entities/header';
import MainPage from 'pages/main';
import DetailsPage from 'pages/details';

export const Routing = () => {
	const baseURL = process.env.REACT_APP_BASE_URL;
	const router = createBrowserRouter([
		{
			path: baseURL,
			element: <MainPage />,
			errorElement: <ErrorPage />,
		},
		{
			path: `${baseURL}/posts/:postId`,
			element: <DetailsPage />,
		},
	]);

	return (
		<Provider store={store}>
			<Header />
			<RouterProvider router={router} />
		</Provider>
	);
};
