export function normalizeText(value: string | null | undefined): string {
  return (value ?? '').toLowerCase();
}
