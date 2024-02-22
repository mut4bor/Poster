import { colors } from 'shared/vars';

export const detailedStyle = {
  card: {
    display: 'flex',
    gap: '10px',
    margin: '40px auto',
    flexDirection: 'column',
    maxWidth: '800px',
    minHeight: '260px',
    padding: '10px',
    border: '1976d2 1px solid',
    borderRadius: '5px',
    background: '#222',
    color: colors.textWhiteColor,
  },
  cardHeader: {
    avatar: {
      bgcolor: 'transparent',
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
    body: {
      fontSize: '1.15rem',
    },
    title: {
      textAlign: 'center',
    },
  },
  button: {
    marginTop: 'auto',
    color: colors.accentColor,
    borderColor: colors.accentColor,
  },
  circularProgress: {
    margin: 'auto',
    color: colors.accentColor,
  },
};
