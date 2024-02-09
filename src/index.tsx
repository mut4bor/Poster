import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/errorPage/errorPage';
import PostPage from './components/postPage/PostPage';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MainPage from './components/mainPage/MainPage';
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'posts/:postId',
		element: <PostPage />,
	},
]);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
