import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { renderWithTheme } from '../../test/utils';
import { Filters } from './Filters';


const defaultProps = {
  genres: [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Pop' },
  ],
  years: [2024, 2023, 2022],
  search: '',
  selectedYear: null,
  selectedGenres: [],
  onSearchChange: vi.fn(),
  onYearChange: vi.fn(),
  onGenresChange: vi.fn(),
};

describe('Filters', () => {
  it('renders search input', () => {
    renderWithTheme(<Filters {...defaultProps} />);

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('renders year select', () => {
    renderWithTheme(<Filters {...defaultProps} />);

    expect(screen.getByLabelText('Year')).toBeInTheDocument();
  });

  it('renders genres select', () => {
    renderWithTheme(<Filters {...defaultProps} />);

    expect(screen.getByLabelText('Genres')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn();
    renderWithTheme(<Filters {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(onSearchChange).toHaveBeenCalledWith('test');
  });
});
