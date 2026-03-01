import type { ReactNode } from 'react';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';


interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
