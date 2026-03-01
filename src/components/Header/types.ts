import type { Genre } from '../../api/types';


export interface HeaderProps {
  genres: Genre[];
  years: number[];
  search: string;
  selectedYear: number | null;
  selectedGenres: number[];
  onSearchChange: (value: string) => void;
  onYearChange: (value: number | null) => void;
  onGenresChange: (value: number[]) => void;
  disabled?: boolean;
}
