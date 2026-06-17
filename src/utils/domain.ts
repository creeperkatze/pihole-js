export function encodeSegment(value: string | number): string {
  return encodeURIComponent(String(value));
}
