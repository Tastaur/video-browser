import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { renderWithTheme } from '../../test/utils';
import { Header } from './Header';


const defaultProps = {
  genres: [],
  years: [],
  search: '',
  selectedYear: null,
  selectedGenres: [],
  onSearchChange: vi.fn(),
  onYearChange: vi.fn(),
  onGenresChange: vi.fn(),
};

describe('Header', () => {
  it('renders title', () => {
    renderWithTheme(<Header {...defaultProps} />);

    expect(screen.getByText('Video Browser')).toBeInTheDocument();
  });

  it('renders filters section', () => {
    renderWithTheme(<Header {...defaultProps} />);

    expect(screen.getByRole('region', { name: 'Filters' })).toBeInTheDocument();
  });
});
