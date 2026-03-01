import { styled } from '@mui/material/styles';


export const ContentContainer = styled('section')(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
}));

export const CenteredContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});
