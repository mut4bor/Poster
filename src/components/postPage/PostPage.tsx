import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../scss/_nullStyle.scss';

function PostPage() {
	return (
		<>
			<Header />
			<div className="">
				<Link className="post__see-more-button" to={'/'}>
					Back
				</Link>
			</div>
		</>
	);
}

export default PostPage;
