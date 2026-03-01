export const getUniqueValues = <T, V>(
  items: T[],
  getValue: (item: T) => V
): V[] => {
  return [...new Set(items.map(getValue))];
};
