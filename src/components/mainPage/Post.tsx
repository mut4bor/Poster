import '../../scss/post.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export interface PostProps {
	title: string;
	body: string;
	userId: number;
	id: number;
	index?: number;
	children?: React.ReactNode;
}

function Post(props: PostProps) {
	const { title, body, userId, id, index, children } = props;
	const navigate = useNavigate();
	return (
		<li className="main-page__post post">
			<h2 className="post__title">{title}</h2>
			<p className="post__content">{body}</p>
			<div className="post__ids">
				<h3 className="post__user-id">User ID: {userId}</h3>
				<h3 className="post__post-id">Post ID: {id}</h3>
			</div>
			{/* <button
				type="button"
				className="post__see-more-button"
				onClick={() => navigate(`post`, { replace: false })}
			>
				See more
			</button> */}
			{children}
		</li>
	);
}

export default Post;
