import { useNavigate } from 'react-router-dom';
import {
	Button,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
} from '@mui/material';

interface PostProps {
	style: object;
	title: string;
	body: string;
	userId: number;
	id: number;
	name?: string;
	website?: string;
	index: number;
}

const cardStyle = {
	card: {
		display: 'flex',
		gap: '10px',
		flexDirection: 'column',
		transform: 'translateX(-50%)',
		minWidth: '300px',
		maxWidth: '800px',
		padding: '10px',
		border: '1976d2 1px solid',
		borderRadius: '5px',
	},
	body: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		fontSize: '1.15rem',
	},
};

export function PostCard(props: PostProps) {
	const { title, body, userId, index, style, name, website } = props;
	const navigate = useNavigate();
	return (
		<>
			<Card style={style} sx={cardStyle.card}>
				<CardHeader
					avatar={<Avatar sx={{ bgcolor: '#1976d2' }}>{userId}</Avatar>}
					title={name}
					subheader={website}
				/>
				<CardContent>
					<Typography variant="h4" sx={{ textAlign: 'center' }}>
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
