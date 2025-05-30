export function ensureNumber(value: number | null | undefined): number {
  return value ?? 0;
}

export function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}
