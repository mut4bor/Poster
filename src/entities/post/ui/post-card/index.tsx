import styles from './styles.module.scss';
import {
	IUser,
	useGetAllPostsQuery,
	useGetAllUsersQuery,
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

export interface PostProps {
	style?: {};
	title: string;
	body: string;
	userId: number;
	id: number;
	name?: string;
	website?: string;
	index: number;
	loading?: number;
	children?: React.ReactNode;
}

export function PostCard(props: PostProps) {
	const { title, body, userId, id, index, children, style, name, website } =
		props;
	const navigate = useNavigate();
	const { data: usersData, error: usersError } = useGetAllUsersQuery();
	return (
		<>
			{usersData && (
				<Card
					style={style}
					sx={{
						display: 'flex',
						gap: '10px',
						flexDirection: 'column',
						transform: 'translateX(-50%)',
						minWidth: '300px',
						maxWidth: '800px',
						padding: '10px',
						border: '1976d2 1px solid',
						borderRadius: '5px',
					}}
				>
					<CardHeader
						avatar={<Avatar sx={{ bgcolor: '#1976d2' }}>{userId}</Avatar>}
						title={name}
						subheader={website}
					/>
					<CardContent>
						<Typography variant="h4" textAlign={'center'}>
							{title}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								fontSize: '1.15rem',
							}}
						>
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
					{children}
				</Card>
			)}
		</>
	);
}
