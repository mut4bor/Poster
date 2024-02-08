import './App.css';
import MainPage from './components/mainPage/MainPage';
import PostPage from './components/postPage/PostPage';
import { PostsProvider } from './components/PostsContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<PostsProvider>
								<MainPage />
							</PostsProvider>
						}
					/>
					<Route
						path="/post"
						element={
							<PostsProvider>
								<PostPage />
							</PostsProvider>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
