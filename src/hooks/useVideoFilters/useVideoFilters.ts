import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { parseNumber, parseNumberList, getUniqueValues } from '../../utils';

import type { UseVideoFiltersProps, UseVideoFiltersResult } from './types';


const SEARCH_PARAM = 'search';
const YEAR_PARAM = 'year';
const GENRES_PARAM = 'genres';

export const useVideoFilters = ({
  videos,
  genres,
}: UseVideoFiltersProps): UseVideoFiltersResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(
    () => searchParams.get(SEARCH_PARAM) ?? '',
    [searchParams]
  );

  const selectedYear = useMemo(
    () => parseNumber(searchParams.get(YEAR_PARAM)),
    [searchParams]
  );

  const selectedGenres = useMemo(
    () => parseNumberList(searchParams.get(GENRES_PARAM)),
    [searchParams]
  );

  const videosFilteredBySearch = useMemo(() => {
    if (!search) {
      return videos;
    }

    const pattern = new RegExp(search, 'i');
    return videos.filter(
      (video) => pattern.test(video.title) || pattern.test(video.artist)
    );
  }, [videos, search]);

  const availableYears = useMemo(
    () => getUniqueValues(videosFilteredBySearch, (v) => v.release_year),
    [videosFilteredBySearch]
  );

  const availableGenreIds = useMemo(
    () => new Set(videosFilteredBySearch.map((v) => v.genre_id)),
    [videosFilteredBySearch]
  );

  const availableGenres = useMemo(
    () => genres.filter((genre) => availableGenreIds.has(genre.id)),
    [genres, availableGenreIds]
  );

  const filteredVideos = useMemo(() => {
    return videosFilteredBySearch.filter((video) => {
      const matchesYear = !selectedYear || video.release_year === selectedYear;
      const matchesGenre =
        0 === selectedGenres.length || selectedGenres.includes(video.genre_id);

      return matchesYear && matchesGenre;
    });
  }, [videosFilteredBySearch, selectedYear, selectedGenres]);

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set(SEARCH_PARAM, value);
        } else {
          newParams.delete(SEARCH_PARAM);
        }
        newParams.delete(YEAR_PARAM);
        newParams.delete(GENRES_PARAM);
        return newParams;
      });
    },
    [setSearchParams]
  );

  const handleYearChange = useCallback(
    (year: number | null) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (year !== null && availableYears.includes(year)) {
            newParams.set(YEAR_PARAM, String(year));
          } else {
            newParams.delete(YEAR_PARAM);
          }
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams, availableYears]
  );

  const handleGenresChange = useCallback(
    (genreIds: number[]) => {
      const validGenreIds = genreIds.filter((id) => availableGenreIds.has(id));
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (validGenreIds.length > 0) {
            newParams.set(GENRES_PARAM, validGenreIds.join(','));
          } else {
            newParams.delete(GENRES_PARAM);
          }
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams, availableGenreIds]
  );

  return {
    search,
    selectedYear,
    selectedGenres,
    availableYears,
    availableGenres,
    filteredVideos,
    setSearch,
    setSelectedYear: handleYearChange,
    setSelectedGenres: handleGenresChange,
  };
};
