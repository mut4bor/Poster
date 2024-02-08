import { createContext, useContext, useState, useEffect } from 'react';
import { PostProps } from './mainPage/Post';
import { useLocation } from 'react-router-dom';

const PostsContext = createContext<PostProps[]>([]);

export function usePosts() {
	return useContext(PostsContext);
}

export function PostsProvider(props: { children: React.ReactNode }) {
	const [posts, setPosts] = useState<PostProps[]>([]);

	const apiCall = () => {
		const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

		fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка при загрузке данных');
				}
				return response.json();
			})
			.then((data) => {
				setPosts(data);
			})
			.catch((error) => {
				console.error('Произошла ошибка:', error);
			});
	};

	useEffect(() => {
		apiCall();
	}, []);

	const location = useLocation();

	useEffect(() => {
		console.log('Current location is ', location);
	}, [location]);

	return (
		<>
			<PostsContext.Provider value={posts}>
				{props.children}
			</PostsContext.Provider>
		</>
	);
}
