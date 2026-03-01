export const parseNumber = (value: string | null): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

export const parseNumberList = (value: string | null): number[] => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map(Number)
    .filter((id) => !Number.isNaN(id));
};
