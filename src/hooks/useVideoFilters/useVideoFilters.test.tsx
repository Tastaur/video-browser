import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';

import type { Video, Genre } from '../../api/types';

import { useVideoFilters } from './useVideoFilters';


const mockGenres: Genre[] = [
  { id: 1, name: 'Rock' },
  { id: 2, name: 'Pop' },
  { id: 3, name: 'Jazz' },
];

const mockVideos: Video[] = [
  { id: 1, title: 'Rock Song', artist: 'Rock Artist', release_year: 2020, genre_id: 1, image_url: '' },
  { id: 2, title: 'Pop Hit', artist: 'Pop Star', release_year: 2021, genre_id: 2, image_url: '' },
  { id: 3, title: 'Jazz Tune', artist: 'Jazz Master', release_year: 2020, genre_id: 3, image_url: '' },
  { id: 4, title: 'Another Rock', artist: 'Rock Band', release_year: 2022, genre_id: 1, image_url: '' },
];

const createWrapper = (initialEntries: string[] = ['/']) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  );
  return Wrapper;
};

describe('useVideoFilters', () => {
  it('returns all videos when no filters applied', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    expect(result.current.filteredVideos).toHaveLength(4);
  });

  it('returns all available years', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    expect(result.current.availableYears).toEqual([2020, 2021, 2022]);
  });

  it('returns all available genres', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    expect(result.current.availableGenres).toHaveLength(3);
  });

  it('filters videos by search immediately', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSearch('Rock');
    });

    expect(result.current.filteredVideos).toHaveLength(2);
  });

  it('filters videos by artist name', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSearch('Jazz Master');
    });

    expect(result.current.filteredVideos).toHaveLength(1);
    expect(result.current.filteredVideos[0].title).toBe('Jazz Tune');
  });

  it('filters videos by year', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSelectedYear(2020);
    });

    expect(result.current.filteredVideos).toHaveLength(2);
  });

  it('filters videos by genre', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSelectedGenres([1]);
    });

    expect(result.current.filteredVideos).toHaveLength(2);
  });

  it('filters by multiple genres', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSelectedGenres([1, 2]);
    });

    expect(result.current.filteredVideos).toHaveLength(3);
  });

  it('resets year and genres when search changes', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSelectedYear(2020);
    });

    act(() => {
      result.current.setSelectedGenres([1]);
    });

    expect(result.current.selectedYear).toBe(2020);
    expect(result.current.selectedGenres).toEqual([1]);

    act(() => {
      result.current.setSearch('Rock');
    });

    expect(result.current.selectedYear).toBeNull();
    expect(result.current.selectedGenres).toEqual([]);
  });

  it('updates available years based on search results', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSearch('Rock');
    });

    expect(result.current.availableYears).toEqual([2020, 2022]);
  });

  it('updates available genres based on search results', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSearch('Rock');
    });

    expect(result.current.availableGenres).toHaveLength(1);
    expect(result.current.availableGenres[0].name).toBe('Rock');
  });

  it('handles case-insensitive search', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSearch('ROCK');
    });

    expect(result.current.filteredVideos).toHaveLength(2);
  });

  it('supports regex patterns in search', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.setSearch('Rock.*');
    });

    expect(result.current.filteredVideos).toHaveLength(2);
  });

  it('initializes filters from URL params', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper(['/?year=2020&genres=1,2']) }
    );

    expect(result.current.selectedYear).toBe(2020);
    expect(result.current.selectedGenres).toEqual([1, 2]);
    expect(result.current.filteredVideos).toHaveLength(1);
  });

  it('initializes search from URL params', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper(['/?search=Rock']) }
    );

    expect(result.current.search).toBe('Rock');
    expect(result.current.filteredVideos).toHaveLength(2);
  });

  it('handles invalid year param by setting null', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper(['/?year=invalid']) }
    );

    expect(result.current.selectedYear).toBeNull();
  });

  it('handles invalid genres param by filtering out invalid values', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper(['/?genres=1,invalid,2']) }
    );

    expect(result.current.selectedGenres).toEqual([1, 2]);
  });

  it('handles completely invalid genres param by returning empty array', () => {
    const { result } = renderHook(
      () => useVideoFilters({ videos: mockVideos, genres: mockGenres }),
      { wrapper: createWrapper(['/?genres=abc,def']) }
    );

    expect(result.current.selectedGenres).toEqual([]);
  });
});
