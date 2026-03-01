import { styled } from '@mui/material/styles';


export const ErrorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

export const ErrorTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

export const ErrorMessage = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  maxWidth: 500,
}));

export const ErrorDetails = styled('pre')(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
  maxWidth: '100%',
  textAlign: 'left',
  color: theme.palette.error.dark,
}));
