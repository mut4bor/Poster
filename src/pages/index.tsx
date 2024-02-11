import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from 'pages/error';
import PostPage from 'pages/posts-details';
import { store } from 'shared/redux/store';
import { Provider } from 'react-redux';
import PostsList from 'pages/posts-list';

export const Routing = () => {
	const router = createBrowserRouter([
		{
			path: '/picasso/',
			element: <PostsList />,
			errorElement: <ErrorPage />,
		},
		{
			path: '/picasso/posts/:postId',
			element: <PostPage />,
		},
	]);

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
};
