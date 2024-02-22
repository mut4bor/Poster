import { colors } from 'shared/vars';

export const cardStyle: { [string: string]: React.CSSProperties } = {
  card: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    maxWidth: '800px',
    padding: '10px',
    border: '1976d2 1px solid',
    borderRadius: '5px',
    background: '#222',
    color: colors.textWhiteColor,
  },
  body: {
    fontSize: '1.15rem',
  },
  title: {
    textAlign: 'center',
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
};
