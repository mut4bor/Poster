import { PostDetailedCard } from 'entities/post';
import { PostComments } from 'entities/post/ui/post-comments';

export default function DetailsPage() {
	return (
		<>
			<PostDetailedCard />
			<PostComments />
		</>
	);
}
