/** Encodes a value for safe use as a URL path segment. */
export function encodeSegment(value: string | number): string {
  return encodeURIComponent(String(value));
}
