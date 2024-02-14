import { useLocation } from 'react-router-dom';

export const getPostNumber = () => {
	const postLocation = useLocation();
	const baseURL = process.env.REACT_APP_BASE_URL;
	const postLocationIndex = parseInt(
		postLocation.pathname.replace(`${baseURL}/posts/`, '')
	);
	return postLocationIndex;
};
