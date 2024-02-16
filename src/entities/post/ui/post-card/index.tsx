import { useNavigate } from 'react-router-dom';
import { cardStyle } from './style';
import {
	Button,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
} from '@mui/material';

type PostProps = {
	style: { [string: string]: React.CSSProperties } | React.CSSProperties;
	data: {
		index: number;
		posts:
		{
			title: string;
			body: string;
			userId: number;
			id: number;
		}; 
		users: {
			name: string;
			website: string;
		};
	}
}

export function PostCard(props: PostProps) {
	const { style, data } = props;
	const { posts, users, index } = data;
	const { name, website } = users;
	const { userId, title, body } = posts;
	const navigate = useNavigate();
	return (
		<>
			<Card sx={{ ...style, ...cardStyle.card }}>
				<CardHeader
					avatar={<Avatar sx={{ bgcolor: '#1976d2' }}>{userId}</Avatar>}
					title={name}
					subheader={website}
				/>
				<CardContent>
					<Typography variant="h4" sx={cardStyle.title}>
						{title}
					</Typography>
					<Typography variant="body1" sx={cardStyle.body}>
						{body}
					</Typography>
				</CardContent>
				<Button
					variant="contained"
					sx={{
						marginTop: 'auto',
					}}
					fullWidth
					onClick={() => navigate(`posts/${index + 1}`)}
				>
					See more
				</Button>
			</Card>
		</>
	);
}
