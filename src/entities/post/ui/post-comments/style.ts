import { colors } from 'shared/vars';

export const commentsStyle = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    height: '450px',
    maxWidth: '100%',
  },
  commentsTitle: {
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '800px',
  },
  card: {
    minWidth: '300px',
    maxWidth: '800px',
    padding: '10px',
    display: 'flex',
    left: '50%',
    transform: 'translateX(-50%)',
    flexDirection: 'column',
    background: colors.grayColor,
  },
  cardHeader: {
    avatar: {
      backgroundColor: 'transparent',
      border: `2px solid ${colors.accentColor}`,
      color: colors.textWhiteColor,
    },
    title: {
      color: colors.accentColor,
      fontWeight: '500',
    },
    subheader: { color: colors.subtitleGrayColor },
  },
  cardContent: {
    body: { color: colors.textWhiteColor },
  },
  circularProgress: {
    margin: 'auto',
    color: colors.accentColor,
  },
};
