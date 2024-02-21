import { cardStyle } from './style';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
} from '@mui/material';

import { colors } from 'shared/vars';

type PostProps = {
  style: { [string: string]: React.CSSProperties } | React.CSSProperties;
  ellipsis: boolean;
  onClick: () => void;
  data: {
    isLoaded: boolean;
    buttonText: string;
    posts: {
      title: string;
      body: string;
      userId: number;
      id: number;
    };
    users: {
      name: string;
      website: string;
    };
  };
};

export function PostCard(props: PostProps) {
  const { style, data, onClick, ellipsis } = props;
  const { posts, users, isLoaded, buttonText } = data;
  const { name, website } = users;
  const { userId, title, body } = posts;

  return (
    <>
      <Card sx={{ ...style, ...cardStyle.card }}>
        {!isLoaded ? (
          <CircularProgress
            sx={{ margin: 'auto', color: colors.accentColor }}
          />
        ) : (
          <>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    border: `2px solid ${colors.accentColor}`,
                    color: colors.textWhiteColor,
                  }}
                >
                  {userId}
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
                  {name}
                </Typography>
              }
              subheader={
                <Typography
                  variant="subtitle2"
                  sx={{ color: colors.subtitleGrayColor }}
                >
                  {website}
                </Typography>
              }
            />
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  ...cardStyle.title,
                  ...(ellipsis && cardStyle.ellipsis),
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  ...cardStyle.body,
                  ...(ellipsis && cardStyle.ellipsis),
                }}
              >
                {body}
              </Typography>
            </CardContent>
            <Button
              variant="outlined"
              sx={{
                marginTop: 'auto',
                color: colors.accentColor,
                borderColor: colors.accentColor,
              }}
              fullWidth
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </>
        )}
      </Card>
    </>
  );
}
