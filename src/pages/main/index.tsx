import { PostCard } from 'entities/post';
import {
  useGetAllPostsQuery,
  useGetAllUsersQuery,
} from 'shared/redux/slices/APISlice';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './styles.module.scss';
import { isDataNotEmpty } from 'shared/isDataNotEmpty';
import { useNavigate } from 'react-router';
import { isStyleTypeNumber } from 'shared/isStyleTypeNumber';

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

export default function MainPage() {
  const { data: postsData, error: postsError } = useGetAllPostsQuery();
  const { data: usersData, error: usersError } = useGetAllUsersQuery();
  const navigate = useNavigate();
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
                  itemSize={260}
                  height={height}
                  width={width}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {({ index, style }) => {
                    return (
                      <PostCard
                        key={index}
                        style={{
                          ...style,
                          transform: 'translateX(-50%)',
                          left: '50%',
                          ...(isStyleTypeNumber(style.height) &&
                            isStyleTypeNumber(style.top) && {
                              height: style.height - 20,
                              top: style.top + 20,
                            }),
                        }}
                        ellipsis={true}
                        data={{
                          isLoaded: itemStatusMap[index] === LOADED,
                          posts: postsData[index],
                          users: usersData[postsData[index].userId - 1],
                          buttonText: 'See more',
                        }}
                        onClick={() => navigate(`posts/${index + 1}`)}
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
