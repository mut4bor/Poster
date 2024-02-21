import {
  useGetAllPostsQuery,
  useGetPostByIndexQuery,
  useGetUserByIndexQuery,
} from 'shared/redux/slices/APISlice';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../post-card';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
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
      {postData && userData && (
        <>
          <PostCard
            style={{
              margin: '40px auto',
            }}
            ellipsis={false}
            data={{
              isLoaded: true,
              posts: postData,
              users: userData,
              buttonText: 'Back to main page',
            }}
            onClick={() => navigate(`${baseURL}`)}
          />
        </>
      )}
    </>
  );
}
