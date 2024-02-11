import { PostDetailedCard } from 'entities/post';
import { PostComments } from 'entities/post/ui/post-comments';

function PostDetailsPage() {
	return (
		<>
			<PostDetailedCard />
			<PostComments />
		</>
	);
}

export default PostDetailsPage;
