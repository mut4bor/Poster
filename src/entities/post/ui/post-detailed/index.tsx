import {
	useGetAllPostsQuery,
	useGetPostByIndexQuery,
	useGetUserByIndexQuery,
} from 'shared/redux/slices/APISlice';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
} from '@mui/material';

import { getPostNumber } from 'shared/getPostNumber';

export function PostDetailedCard() {
	const navigate = useNavigate();
	const baseURL = process.env.REACT_APP_BASE_URL;

	const { data: allPostsData, error: allPostsError } = useGetAllPostsQuery();

	const postData = allPostsData?.find(function (item) {
		return item.id === getPostNumber();
	});

	const { data: userData, error: userError } = useGetUserByIndexQuery(
		postData?.userId ? postData?.userId : 1
	);

	if (allPostsError || userError) {
		return (
			<>
				<div>Error</div>
			</>
		);
	}

	return (
		<>
			{postData && userData && (
				<Card
					sx={{
						minWidth: '300px',
						maxWidth: '800px',
						margin: '40px auto',
						padding: '10px',
					}}
				>
					<CardHeader
						avatar={
							<Avatar sx={{ bgcolor: '#1976d2' }}>{postData.userId}</Avatar>
						}
						title={userData.name}
						subheader={userData.website}
					/>
					<CardContent>
						<Typography variant="h4" sx={{ textAlign: 'center' }}>
							{postData.title}
						</Typography>
						<Typography variant="body1">{postData.body}</Typography>
					</CardContent>
					<Button
						variant="contained"
						sx={{
							marginTop: 'auto',
						}}
						fullWidth
						onClick={() => navigate(`${baseURL}`)}
					>
						Back to main page
					</Button>
				</Card>
			)}
		</>
	);
}
