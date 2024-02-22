import { useGetAllCommentsQuery } from 'shared/redux/slices/APISlice';
import { getPostNumber } from 'shared/getPostNumber';
import { isStyleTypeNumber } from 'shared/isStyleTypeNumber';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { commentsStyle } from './style';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
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
      <Box sx={commentsStyle.box}>
        <Typography variant="h4" sx={commentsStyle.commentsTitle}>
          Comments
        </Typography>

        <AutoSizer>
          {({ width, height }: { width: number; height: number }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={filderedComments ? filderedComments.length : 5}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  itemCount={filderedComments ? filderedComments.length : 5}
                  itemSize={200}
                  height={height}
                  width={width}
                  ref={ref}
                  onItemsRendered={onItemsRendered}
                >
                  {({ index, style }) => {
                    return (
                      <Card
                        sx={{
                          ...style,
                          ...commentsStyle.card,
                          ...(isStyleTypeNumber(style.height) &&
                            isStyleTypeNumber(style.top) && {
                              height: style.height - 20,
                              top: style.top + 20,
                            }),
                        }}
                      >
                        {filderedComments ? (
                          <>
                            <CardHeader
                              avatar={
                                <Avatar
                                  variant="circular"
                                  sx={commentsStyle.cardHeader.avatar}
                                >
                                  {filderedComments[
                                    index
                                  ].name[0].toUpperCase()}
                                </Avatar>
                              }
                              title={
                                <Typography
                                  variant="subtitle1"
                                  sx={commentsStyle.cardHeader.title}
                                >
                                  {filderedComments[index].name}
                                </Typography>
                              }
                              subheader={
                                <Typography
                                  variant="subtitle2"
                                  sx={commentsStyle.cardHeader.subheader}
                                >
                                  {filderedComments[index].email}
                                </Typography>
                              }
                            />
                            <CardContent>
                              <Typography
                                variant="body1"
                                sx={commentsStyle.cardContent.body}
                              >
                                {filderedComments[index].body}
                              </Typography>
                            </CardContent>
                          </>
                        ) : (
                          <CircularProgress
                            sx={commentsStyle.circularProgress}
                          />
                        )}
                      </Card>
                    );
                  }}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </Box>
    </>
  );
}
