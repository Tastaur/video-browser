import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '../theme/theme';
import { HomePage } from './HomePage';
import * as useVideosModule from '../hooks/useVideos';


const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('HomePage', () => {
  it('renders header with Video Browser title', () => {
    vi.spyOn(useVideosModule, 'useVideos').mockReturnValue({
      data: { genres: [], videos: [] },
      isLoading: false,
    } as unknown as ReturnType<typeof useVideosModule.useVideos>);

    renderWithProviders(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Video Browser' })).toBeInTheDocument();
  });

  it('renders filters section', () => {
    vi.spyOn(useVideosModule, 'useVideos').mockReturnValue({
      data: { genres: [], videos: [] },
      isLoading: false,
    } as unknown as ReturnType<typeof useVideosModule.useVideos>);

    renderWithProviders(<HomePage />);

    expect(screen.getByRole('region', { name: 'Filters' })).toBeInTheDocument();
  });

  it('renders loading state', () => {
    vi.spyOn(useVideosModule, 'useVideos').mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useVideosModule.useVideos>);

    renderWithProviders(<HomePage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
