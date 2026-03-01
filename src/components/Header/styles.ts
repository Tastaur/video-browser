import { styled } from '@mui/material/styles';


export const HeaderContainer = styled('header')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  textAlign: 'center',
}));

export const Title = styled('h4')(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(3),
  marginTop: 0,
}));
