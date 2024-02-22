import {
  useGetAllPostsQuery,
  useGetUserByIndexQuery,
} from 'shared/redux/slices/APISlice';
import { useNavigate } from 'react-router-dom';

import { detailedStyle } from './style';
import { colors } from 'shared/vars';

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
} from '@mui/material';

import { getPostNumber } from 'shared/getPostNumber';

export function PostDetailedCard() {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const { data: allPostsData, error: allPostsError } = useGetAllPostsQuery();

  const postData = allPostsData?.find(function (item) {
    return item.id === getPostNumber();
  });

  const { data: userData, error: userError } = useGetUserByIndexQuery(
    postData?.userId ? postData?.userId : 1
  );

  if (allPostsError || userError) {
    return (
      <>
        <div>Error</div>
      </>
    );
  }

  return (
    <>
      <Card sx={detailedStyle.card}>
        {postData && userData ? (
          <>
            <CardHeader
              avatar={
                <Avatar sx={detailedStyle.cardHeader.avatar}>
                  {postData.userId}
                </Avatar>
              }
              title={
                <Typography
                  variant="subtitle1"
                  sx={detailedStyle.cardHeader.title}
                >
                  {userData.name}
                </Typography>
              }
              subheader={
                <Typography
                  variant="subtitle2"
                  sx={detailedStyle.cardHeader.subheader}
                >
                  {userData.website}
                </Typography>
              }
            />

            <CardContent>
              <Typography variant="h4" sx={detailedStyle.cardContent.title}>
                {postData.title}
              </Typography>

              <Typography variant="body1" sx={detailedStyle.cardContent.body}>
                {postData.body}
              </Typography>
            </CardContent>

            <Button
              variant="outlined"
              sx={detailedStyle.button}
              fullWidth
              onClick={() => navigate(`${baseURL}`)}
            >
              Back to main page
            </Button>
          </>
        ) : (
          <CircularProgress sx={detailedStyle.circularProgress} />
        )}
      </Card>
    </>
  );
}
