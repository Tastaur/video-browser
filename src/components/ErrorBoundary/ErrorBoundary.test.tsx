import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { renderWithTheme } from '../../test/utils';
import { ErrorBoundary } from './ErrorBoundary';


const ThrowError = () => {
  throw new Error('Test error message');
};

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    renderWithTheme(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithTheme(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload Page' })).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
