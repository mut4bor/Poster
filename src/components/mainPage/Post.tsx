import '../../scss/post.scss';
import { Link } from 'react-router-dom';
export interface PostProps {
	title: string;
	body: string;
	userId: number;
	id: number;
	index: number;
	style?: {}
	children?: React.ReactNode;
}

function Post(props: PostProps) {
	const { title, body, userId, id, index, children, style } = props;
	return (
		<li className="main-page__post post" style={style}>
			<h2 className="post__title">{title}</h2>
			<p className="post__content">{body}</p>
			<div className="post__ids">
				<h3 className="post__user-id">User ID: {userId}</h3>
				<h3 className="post__post-id">Post ID: {id}</h3>
			</div>
			<Link className="post__see-more-button" to={`posts/${index + 1}`}>
				See more
			</Link>
			{children}
		</li>
	);
}

export default Post;
