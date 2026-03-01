import { useMediaQuery, useTheme } from '@mui/material';


export const useGridColumns = (): number => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));

  if (isXs) {
    return 1;
  }

  if (isSm) {
    return 2;
  }

  return 3;
};
