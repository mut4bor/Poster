import { useLocation } from 'react-router-dom';
import {
	useGetPostByIndexQuery,
	useGetUserByIndexQuery,
} from 'shared/redux/slices/APISlice';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
} from '@mui/material';

export function PostDetailed() {
	const postLocation = useLocation();
	const postLocationIndex = parseInt(
		postLocation.pathname.replace('/posts/', '')
	);
	const { data: postData, error: postError } =
		useGetPostByIndexQuery(postLocationIndex);

	const { data: userData, error: userError } = useGetUserByIndexQuery(1);
	const navigate = useNavigate();

	if (postError || userError) {
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
						<Typography variant="h4" textAlign={'center'}>
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
						onClick={() => navigate(`/`)}
					>
						Back to main page
					</Button>
				</Card>
			)}
		</>
	);
}
