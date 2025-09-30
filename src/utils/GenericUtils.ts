export function filterByProperty<T, K extends keyof T>(
  arr: T[],
  key: K,
  value: T[K]
): T[] {
  return arr.filter((item) => item[key] === value);
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
