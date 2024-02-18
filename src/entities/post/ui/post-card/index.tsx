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
		posts: {
			title: string;
			body: string;
			userId: number;
			id: number;
		};
		users: {
			name: string;
			website: string;
		};
	};
};

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
					avatar={
						<Avatar
							sx={{
								bgcolor: 'transparent',
								border: '2px solid #71aaeb',
								color: '#e1e3e6',
							}}
						>
							{userId}
						</Avatar>
					}
					title={
						<p
							style={{
								color: '#71aaeb',
								fontWeight: '500',
								fontSize: '1.1rem',
							}}
						>
							{name}
						</p>
					}
					subheader={<p style={{ color: '#828282' }}>{website}</p>}
					sx={{}}
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
					variant="outlined"
					sx={{
						marginTop: 'auto',
						color: '#71aaeb',
						borderColor: '#71aaeb',
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
