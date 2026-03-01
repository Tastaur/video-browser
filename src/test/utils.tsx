import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../theme/theme';


export const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};
