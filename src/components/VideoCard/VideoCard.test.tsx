import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { renderWithTheme } from '../../test/utils';
import { VideoCard } from './VideoCard';


describe('VideoCard', () => {
  const defaultProps = {
    title: 'Test Video',
    artist: 'Test Artist',
    year: 2024,
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders title', () => {
    renderWithTheme(<VideoCard {...defaultProps} />);

    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('renders artist', () => {
    renderWithTheme(<VideoCard {...defaultProps} />);

    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('renders year', () => {
    renderWithTheme(<VideoCard {...defaultProps} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders image', () => {
    renderWithTheme(<VideoCard {...defaultProps} />);

    const image = screen.getByRole('img', { name: 'Test Video' });
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});
