import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useGetPostByIndexQuery } from 'shared/redux/slices/postsAPiSlice';
import styles from './styles.module.scss';

export function PostDetailed() {
	const postLocation = useLocation();
	const postLocationIndex = postLocation.pathname.replace('/posts/', '');
	const { data, error } = useGetPostByIndexQuery(`${postLocationIndex}`);

	if (error) {
		return (
			<>
				<div>Error</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.page}>
				<div className={styles.post}>
					<h2 className={styles.title}>{data?.title}</h2>
					<p className={styles.content}>{data?.body}</p>
					<div className={styles.ids}>
						<h2>User ID: {data?.userId}</h2>
						<h2>Post ID: {data?.id}</h2>
					</div>
					<Link className={styles.button} to={'/'}>
						Back to main page
					</Link>
				</div>
			</div>
		</>
	);
}
