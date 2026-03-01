import { styled } from '@mui/material/styles';

import { CenteredContent } from '../shared/styles';


export const ErrorMessage = styled(CenteredContent)(({ theme }) => ({
  color: theme.palette.error.main,
  ...theme.typography.h6,
}));
