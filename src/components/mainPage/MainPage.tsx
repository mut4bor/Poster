import Header from '../Header';
import Post from './Post';
import '../../scss/mainPage.scss';
import { PostProps } from './Post';
import React, { createRef, Fragment, PureComponent } from 'react';
import { useGetAllPostsQuery } from '../../redux/slices/postsAPiSlice';
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {} as any;

const isItemLoaded = (index: any) => !!itemStatusMap[index];
const loadMoreItems = (startIndex: any, stopIndex: any) => {
	for (let index = startIndex; index <= stopIndex; index++) {
		itemStatusMap[index] = LOADING;
	}
	return new Promise<void>((resolve) =>
		setTimeout(() => {
			for (let index = startIndex; index <= stopIndex; index++) {
				itemStatusMap[index] = LOADED;
			}
			resolve();
		}, 2500)
	);
};

function MainPage() {
	const { data, error, isLoading } = useGetAllPostsQuery();

	return (
		<div className="main-page">
			<Header />

			{data && (
				<InfiniteLoader
					isItemLoaded={isItemLoaded}
					itemCount={data.length}
					loadMoreItems={loadMoreItems}
				>
					{({ onItemsRendered, ref }) => (
						<List
							itemCount={data.length}
							itemSize={200}
							className="main-page__list"
							height={2160}
							width={0}
							onItemsRendered={onItemsRendered}
							ref={ref}
							innerElementType={'ul'}
							style={{
								width: '100%',
								height: 'calc(100vh - 80px)',
							}}
						>
							{({ index, style }) => {
								return (
									<Post
										key={index}
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
											itemStatusMap[index] === LOADED ? data[index].userId : 0
										}
										id={itemStatusMap[index] === LOADED ? data[index].id : 0}
										index={index}
										style={style}
									/>
								);
							}}
						</List>
					)}
				</InfiniteLoader>
			)}
		</div>
	);
}

export default MainPage;
