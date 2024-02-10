import { PostCard } from 'entities/post';
import { useGetAllPostsQuery } from 'shared/redux/slices/postsAPiSlice';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './styles.module.scss';

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {} as number[];

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
	const { data, error } = useGetAllPostsQuery();

	if (error) {
		return (
			<>
				<div>Error</div>
			</>
		);
	}

	return (
		<div className={styles.page}>
			{data && (
				<AutoSizer>
					{({ height, width }: { height: number; width: number }) => (
						<InfiniteLoader
							isItemLoaded={isItemLoaded}
							itemCount={data.length}
							loadMoreItems={loadMoreItems}
						>
							{({ onItemsRendered, ref }) => (
								<List
									itemCount={data.length}
									itemSize={220}
									height={height}
									width={width}
									onItemsRendered={onItemsRendered}
									ref={ref}
									innerElementType={'ul'}
								>
									{({ index, style }) => {
										return (
											<PostCard
												key={index}
												style={{
													...style,
													left: '50%',
													top: typeof style.top === 'number' && style.top + 20,
													height:
														typeof style.height === 'number' &&
														style.height - 20,
												}}
												title={
													itemStatusMap[index] === LOADED
														? data[index].title
														: 'loading'
												}
												body={
													itemStatusMap[index] === LOADED
														? data[index].body
														: 'loading'
												}
												userId={
													itemStatusMap[index] === LOADED
														? data[index].userId
														: 0
												}
												id={
													itemStatusMap[index] === LOADED ? data[index].id : 0
												}
												index={index}
											/>
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
