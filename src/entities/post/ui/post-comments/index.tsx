import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import {
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
} from '@mui/material';
import { useGetAllCommentsQuery } from 'shared/redux/slices/APISlice';
import { getPostNumber } from 'shared/getPostNumber';

const LOADING = 1;
const LOADED = 2;
const itemStatusMap = {} as number[];

const isItemLoaded = (index: number) => !!itemStatusMap[index];
const loadMoreItems = (startIndex: number, stopIndex: number) => {
	for (let index = startIndex; index <= stopIndex; index++) {
		itemStatusMap[index] = LOADING;
	}
	return new Promise<void>((resolve) =>
		setTimeout(() => {
			for (let index = startIndex; index <= stopIndex; index++) {
				itemStatusMap[index] = LOADED;
			}
			resolve();
		}, 1500)
	);
};

export function PostComments() {
	const { data: commentsData, error: commentsError } = useGetAllCommentsQuery();

	const filderedComments = commentsData?.filter(
		(post) => post.postId === getPostNumber()
	);

	if (commentsError) {
		return (
			<>
				<div>Error</div>
			</>
		);
	}

	console.log(filderedComments);
	return (
		<div
			className=""
			style={{
				minWidth: '300px',
				maxWidth: '800px',
				height: '450px',
				margin: '0 auto',
			}}
		>
			<Typography variant="h4" sx={{ margin: '0 auto' }}>
				Comments
			</Typography>
			{filderedComments && (
				<AutoSizer>
					{({ height, width }: { height: number; width: number }) => (
						<InfiniteLoader
							isItemLoaded={isItemLoaded}
							itemCount={filderedComments.length}
							loadMoreItems={loadMoreItems}
						>
							{({ onItemsRendered, ref }) => (
								<List
									itemCount={filderedComments.length}
									itemSize={200}
									height={height}
									width={width}
									onItemsRendered={onItemsRendered}
									ref={ref}
								>
									{({ index, style }) => {
										return (
											<>
												<Card
													sx={{
														...style,
														minWidth: '300px',
														maxWidth: '800px',
														padding: '10px',
														top:
															typeof style.top === 'number'
																? style.top + 20
																: style.top,
														height:
															typeof style.height === 'number'
																? style.height - 20
																: style.height,
													}}
												>
													<CardHeader
														avatar={
															<Avatar sx={{ bgcolor: '#1976d2' }}>
																{filderedComments[index].name[0].toUpperCase()}
															</Avatar>
														}
														title={filderedComments[index].name}
														subheader={filderedComments[index].email}
													/>
													<CardContent>
														{filderedComments[index].body}
													</CardContent>
												</Card>
											</>
										);
									}}
								</List>
							)}
						</InfiniteLoader>
					)}
				</AutoSizer>
			)}
		</div>
	);
}
