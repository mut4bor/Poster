import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../scss/_nullStyle.scss';
import { useLocation } from 'react-router-dom';
import { useGetPostByIndexQuery } from '../../redux/slices/postsAPiSlice';
import '../../scss/postPage.scss';

function PostPage() {
	const postLocation = useLocation();
	const postLocationIndex = postLocation.pathname.replace('/posts/', '');
	const { data, error, isLoading } = useGetPostByIndexQuery(
		`${postLocationIndex}`
	);

	return (
		<>
			<Header />
			<div className="postPage">
				<div className="paged-post">
					<h2 className="paged-post__title">{data?.title}</h2>
					<p className="paged-post__content">{data?.body}</p>
					<div className="paged-post__ids">
						<h2 className="paged-post__user-id">User ID: {data?.userId}</h2>
						<h2 className="paged-post__post-id">Post ID: {data?.id}</h2>
					</div>
					<Link className="paged-post__see-more-button" to={'/'}>
						Back to main page
					</Link>
				</div>
			</div>
		</>
	);
}

export default PostPage;
