import type { Video, Genre } from '../../api/types';


export interface UseVideoFiltersProps {
  videos: Video[];
  genres: Genre[];
}

export interface UseVideoFiltersResult {
  search: string;
  selectedYear: number | null;
  selectedGenres: number[];
  availableYears: number[];
  availableGenres: Genre[];
  filteredVideos: Video[];
  setSearch: (value: string) => void;
  setSelectedYear: (value: number | null) => void;
  setSelectedGenres: (value: number[]) => void;
}
