import Header from '../Header';
import Post from './Post';
import '../../scss/mainPage.scss';
import { usePosts } from '../PostsContext';
import { PostProps } from './Post';
import { Link } from 'react-router-dom';
function MainPage() {
	const posts = usePosts();
	return (
		<div className="main-page">
			<Header />
			<ul className="main-page__container">
				{posts.map((post: PostProps, index) => (
					<Post
						key={index}
						title={post.title}
						body={post.body}
						userId={post.userId}
						id={post.id}
					>
						<Link className="post__see-more-button" to={`post/${index}`}>
							See more
						</Link>
					</Post>
				))}
			</ul>
		</div>
	);
}

export default MainPage;
