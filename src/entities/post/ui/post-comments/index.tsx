import { useGetAllCommentsQuery } from 'shared/redux/slices/APISlice';
import { getPostNumber } from 'shared/getPostNumber';
import { isStyleTypeNumber } from 'shared/isStyleTypeNumber';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { colors } from 'shared/vars';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from '@mui/material';

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
    return <div>Error</div>;
  }

  return (
    <>
      {filderedComments && (
        <>
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
                      ref={ref}
                      onItemsRendered={onItemsRendered}
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
                                background: colors.grayColor,
                                ...(isStyleTypeNumber(style.height) &&
                                  isStyleTypeNumber(style.top) && {
                                    height: style.height - 20,
                                    top: style.top + 20,
                                  }),
                              }}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    variant="circular"
                                    sx={{
                                      bgcolor: 'transparent',
                                      border: `2px solid ${colors.accentColor}`,
                                      color: colors.textWhiteColor,
                                    }}
                                  >
                                    {filderedComments[
                                      index
                                    ].name[0].toUpperCase()}
                                  </Avatar>
                                }
                                title={
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      color: colors.accentColor,
                                      fontWeight: '500',
                                    }}
                                  >
                                    {filderedComments[index].name}
                                  </Typography>
                                }
                                subheader={
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ color: colors.subtitleGrayColor }}
                                  >
                                    {filderedComments[index].email}
                                  </Typography>
                                }
                              />
                              <CardContent>
                                <Typography
                                  variant="body1"
                                  sx={{ color: colors.textWhiteColor }}
                                >
                                  {filderedComments[index].body}
                                </Typography>
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
          </div>
        </>
      )}
    </>
  );
}
