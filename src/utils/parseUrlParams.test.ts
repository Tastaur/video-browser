import { describe, it, expect } from 'vitest';

import { parseNumber, parseNumberList } from './parseUrlParams';


describe('parseYear', () => {
  it('returns null for null input', () => {
    expect(parseNumber(null)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseNumber('')).toBeNull();
  });

  it('parses valid year string', () => {
    expect(parseNumber('2020')).toBe(2020);
  });

  it('returns null for non-numeric string', () => {
    expect(parseNumber('invalid')).toBeNull();
  });

  it('parses negative numbers', () => {
    expect(parseNumber('-100')).toBe(-100);
  });

  it('parses decimal numbers', () => {
    expect(parseNumber('2020.5')).toBe(2020.5);
  });
});

describe('parseNumberList', () => {
  it('returns empty array for null input', () => {
    expect(parseNumberList(null)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(parseNumberList('')).toEqual([]);
  });

  it('parses single number', () => {
    expect(parseNumberList('1')).toEqual([1]);
  });

  it('parses comma-separated numbers', () => {
    expect(parseNumberList('1,2,3')).toEqual([1, 2, 3]);
  });

  it('filters out invalid values', () => {
    expect(parseNumberList('1,invalid,2')).toEqual([1, 2]);
  });

  it('returns empty array for all invalid values', () => {
    expect(parseNumberList('abc,def')).toEqual([]);
  });

  it('handles spaces in values', () => {
    expect(parseNumberList('1, 2, 3')).toEqual([1, 2, 3]);
  });
});
