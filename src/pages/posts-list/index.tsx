import { PostCard } from 'entities/post';
import {
	useGetAllPostsQuery,
	useGetAllUsersQuery,
} from 'shared/redux/slices/APISlice';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './styles.module.scss';
import { Box, CircularProgress } from '@mui/material';
import { isDataNotEmpty } from 'shared/isDataNotEmpty';

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

export default function PostsListPage() {
	const { data: postsData, error: postsError } = useGetAllPostsQuery();
	const { data: usersData, error: usersError } = useGetAllUsersQuery();

	if (postsError || usersError) {
		return <div>Error</div>;
	}

	return (
		<div className={styles.page}>
			{isDataNotEmpty(postsData) && isDataNotEmpty(usersData) && (
				<AutoSizer>
					{({ height, width }: { height: number; width: number }) => (
						<InfiniteLoader
							isItemLoaded={isItemLoaded}
							itemCount={postsData.length}
							loadMoreItems={loadMoreItems}
						>
							{({ onItemsRendered, ref }) => (
								<List
									itemCount={postsData.length}
									itemSize={320}
									height={height}
									width={width}
									onItemsRendered={onItemsRendered}
									ref={ref}
								>
									{({ index, style }) => {
										if (itemStatusMap[index] === LOADED) {
											return (
												<PostCard
													key={index}
													style={{
														...style,
														left: '50%',
														top:
															typeof style.top === 'number'
																? style.top + 20
																: style.top,
														height:
															typeof style.height === 'number'
																? style.height - 20
																: style.height,
													}}
													title={postsData[index].title}
													body={postsData[index].body}
													userId={postsData[index].userId}
													id={postsData[index].id}
													index={index}
													name={usersData[postsData[index].userId - 1].name}
													website={
														usersData[postsData[index].userId - 1].website
													}
												/>
											);
										}

										return (
											<Box
												style={{
													...style,
													top:
														typeof style.top === 'number'
															? style.top + 20
															: style.top,
													height:
														typeof style.height === 'number'
															? style.height - 20
															: style.height,
													left: '50%',
													transform: 'translateX(-50%)',
													width: '800px',
												}}
												display={'flex'}
												alignItems={'center'}
												justifyContent={'center'}
												border={'#1976d2 1px solid'}
												borderRadius={'5px'}
											>
												<CircularProgress />
											</Box>
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
