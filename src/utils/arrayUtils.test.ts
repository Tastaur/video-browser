import { describe, it, expect } from 'vitest';

import { getUniqueValues } from './arrayUtils';


describe('getUniqueValues', () => {
  it('returns empty array for empty input', () => {
    expect(getUniqueValues([], (x) => x)).toEqual([]);
  });

  it('extracts unique values', () => {
    const items = [
      { id: 1, year: 2020 },
      { id: 2, year: 2021 },
      { id: 3, year: 2020 },
    ];

    const result = getUniqueValues(items, (item) => item.year);
    expect(result).toEqual([2020, 2021]);
  });

  it('preserves insertion order', () => {
    const items = [
      { id: 1, letter: 'c' },
      { id: 2, letter: 'a' },
      { id: 3, letter: 'b' },
      { id: 4, letter: 'a' },
    ];

    const result = getUniqueValues(items, (item) => item.letter);
    expect(result).toEqual(['c', 'a', 'b']);
  });

  it('works with primitive arrays', () => {
    const items = [1, 2, 2, 3, 1];
    const result = getUniqueValues(items, (x) => x);
    expect(result).toEqual([1, 2, 3]);
  });
});
