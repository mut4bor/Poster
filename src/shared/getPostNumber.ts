import { useLocation } from 'react-router-dom';

export const getPostNumber = () => {
	const postLocation = useLocation();
	const postLocationIndex = parseInt(
		postLocation.pathname.replace('/picasso/posts/', '')
	);
	return postLocationIndex;
};
