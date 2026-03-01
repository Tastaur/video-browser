import { screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';

import { renderWithTheme } from '../../test/utils';
import { Content } from './Content';
import type { Video } from '../../api/types';


const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Test Video 1',
    artist: 'Artist 1',
    release_year: 2024,
    genre_id: 1,
    image_url: 'https://example.com/1.jpg',
  },
  {
    id: 2,
    title: 'Test Video 2',
    artist: 'Artist 2',
    release_year: 2023,
    genre_id: 2,
    image_url: 'https://example.com/2.jpg',
  },
];

describe('Content', () => {
  beforeAll(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 1200,
      height: 800,
      top: 0,
      left: 0,
      bottom: 800,
      right: 1200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 800,
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 800,
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders video cards', () => {
    renderWithTheme(<Content videos={mockVideos} isLoading={false} isError={false} />);

    expect(screen.getByText('Test Video 1')).toBeInTheDocument();
    expect(screen.getByText('Test Video 2')).toBeInTheDocument();
  });

  it('renders artist names', () => {
    renderWithTheme(<Content videos={mockVideos} isLoading={false} isError={false} />);

    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
  });

  it('renders empty state when no videos', () => {
    renderWithTheme(<Content videos={[]} isLoading={false} isError={false} />);

    expect(screen.getByText('No videos were found')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    renderWithTheme(<Content videos={[]} isLoading={true} isError={false} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    renderWithTheme(<Content videos={[]} isLoading={false} isError={true} />);

    expect(screen.getByText('OOOOOOps... something went wrong :(')).toBeInTheDocument();
  });
});
