import Header from '../Header';
import Post from './Post';
import '../../scss/mainPage.scss';
import { PostProps } from './Post';

import { useGetAllPostsQuery } from '../../redux/slices/postsAPiSlice';
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

function MainPage() {
	const { data, error, isLoading } = useGetAllPostsQuery();

	return (
		<div className="main-page">
			<Header />
			{data && (
				<div className="main-page__container">
					<AutoSizer>
						{({ height, width }: { height: number; width: number }) => (
							<List
								itemCount={data.length}
								itemSize={200}
								className="list"
								height={height}
								width={width}
							>
								{({ index, style }) => {
									return (
										<Post
											key={index}
											title={data[index].title}
											body={data[index].body}
											userId={data[index].userId}
											id={data[index].id}
											index={index}
											style={style}
										/>
									);
								}}
							</List>
						)}
					</AutoSizer>
				</div>
			)}
		</div>
	);
}

export default MainPage;
