import './App.css';
import MainPage from './components/mainPage/MainPage';
import PostPage from './components/postPage/PostPage';
import { PostsProvider } from './components/PostsContext';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/posts/:postId"
					element={
						<PostsProvider>
							<PostPage />
						</PostsProvider>
					}
				/>
				<Route
					path="/"
					element={
						<PostsProvider>
							<MainPage />
						</PostsProvider>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
