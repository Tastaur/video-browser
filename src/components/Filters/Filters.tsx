import { TextField } from '@mui/material';

import { FiltersContainer, StyledTextField, StyledAutocomplete } from './styles';
import type { FiltersProps } from './types';


export const Filters = ({
  genres,
  years,
  search,
  selectedYear,
  selectedGenres,
  onSearchChange,
  onYearChange,
  onGenresChange,
  disabled = false,
}: FiltersProps) => {
  const selectedGenreObjects = genres.filter((g) => selectedGenres.includes(g.id));

  return (
    <FiltersContainer aria-label="Filters" data-testid="filters">
      <StyledTextField
        label="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={disabled}
        data-testid="search-input"
      />
      <StyledAutocomplete
        options={years}
        value={selectedYear}
        onChange={(_, newValue) => onYearChange(newValue as number | null)}
        getOptionLabel={(option) => String(option)}
        renderInput={(params) => <TextField {...params} label="Year" />}
        slotProps={{
          listbox: { style: { maxHeight: 300 } },
        }}
        disablePortal
        disabled={disabled}
        data-testid="year-filter"
      />
      <StyledAutocomplete
        multiple
        options={genres}
        value={selectedGenreObjects}
        onChange={(_, newValue) => {
          onGenresChange(newValue.map((g) => g.id));
        }}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Genres" />}
        slotProps={{
          listbox: { style: { maxHeight: 300 } },
        }}
        disablePortal
        limitTags={1}
        disabled={disabled}
        data-testid="genres-filter"
      />
    </FiltersContainer>
  );
};
