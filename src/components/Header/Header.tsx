import { Filters } from '../Filters/Filters';

import { HeaderContainer, Title } from './styles';
import type { HeaderProps } from './types';


export const Header = ({
  genres,
  years,
  search,
  selectedYear,
  selectedGenres,
  onSearchChange,
  onYearChange,
  onGenresChange,
  disabled,
}: HeaderProps) => (
  <HeaderContainer>
    <Title>Video Browser</Title>
    <Filters
      genres={genres}
      years={years}
      search={search}
      selectedYear={selectedYear}
      selectedGenres={selectedGenres}
      onSearchChange={onSearchChange}
      onYearChange={onYearChange}
      onGenresChange={onGenresChange}
      disabled={disabled}
    />
  </HeaderContainer>
);
