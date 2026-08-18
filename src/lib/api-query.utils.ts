const DEFAULT_MAX_LIMIT = 100;

export function parseApiLimit(
  value: string | null,
  max = DEFAULT_MAX_LIMIT,
): number | undefined {
  if (!value) return undefined;

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return undefined;

  return Math.min(parsed, max);
}

export function parseApiBoolean(value: string | null): boolean {
  return value === "true";
}
