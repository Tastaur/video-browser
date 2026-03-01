import { styled } from '@mui/material/styles';

import { CenteredContent } from '../shared/styles';


export const EmptyMessage = styled(CenteredContent)(({ theme }) => ({
  color: theme.palette.text.secondary,
  ...theme.typography.h6,
}));
