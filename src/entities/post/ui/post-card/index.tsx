import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export interface PostProps {
	style?: {};
	title: string;
	body: string;
	userId: number;
	id: number;
	index: number;
	loading?: number;
	children?: React.ReactNode;
}

export function PostCard(props: PostProps) {
	const { title, body, userId, id, index, children, style } = props;
	return (
		<li className={styles.card} style={style}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.content}>{body}</p>
			<div className={styles.ids}>
				<h3>User ID: {userId}</h3>
				<h3>Post ID: {id}</h3>
			</div>
			<Link className={styles.button} to={`posts/${index + 1}`}>
				See more
			</Link>
			{children}
		</li>
	);
}
