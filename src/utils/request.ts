import type { ApiErrorBody, JsonObject, QueryValue } from '../types/index.js';

export function normalizeBaseUrl(baseUrl: string): string {
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new TypeError('baseUrl must be a non-empty string');
  }

  const url = new URL(baseUrl);
  const pathname = url.pathname.replace(/\/+$/, '');
  url.pathname = pathname.endsWith('/api') ? pathname.slice(0, -4) || '/' : pathname || '/';
  return url.toString().replace(/\/$/, '');
}

export function appendQuery(url: URL, query?: object): URL {
  if (!query) return url;

  for (const [key, rawValue] of Object.entries(query as Record<string, QueryValue>)) {
    if (rawValue == null) continue;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    for (const value of values) {
      if (value == null) continue;
      url.searchParams.append(key, String(value));
    }
  }

  return url;
}

export function buildApiUrl(baseUrl: string, path: string, query?: object): string {
  const trimmedPath = path.replace(/^\/+/, '');
  const url = new URL(`${baseUrl}/api/${trimmedPath}`);
  return appendQuery(url, query).toString();
}

export function isPlainObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof FormData) && !(value instanceof Blob);
}

export function isRawBody(value: unknown): value is BodyInit {
  return (
    typeof value === 'string' ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  );
}

export function withJsonBody(init: Omit<RequestInit, 'body'> & { body?: BodyInit | object | object[] | null }): RequestInit {
  const { body, headers, ...rest } = init;
  const resolvedHeaders = new Headers(headers);

  if (body == null) {
    return { ...rest, headers: resolvedHeaders };
  }

  if (isRawBody(body)) {
    return { ...rest, headers: resolvedHeaders, body };
  }

  if (!resolvedHeaders.has('Content-Type')) {
    resolvedHeaders.set('Content-Type', 'application/json');
  }

  return {
    ...rest,
    headers: resolvedHeaders,
    body: JSON.stringify(body),
  };
}

export function extractErrorMessage(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    const record = body as ApiErrorBody;
    const message = record.error?.message ?? record.message;
    if (typeof message === 'string' && message.length > 0) return message;
  }

  return `HTTP ${status}`;
}

export async function parseErrorBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => null);
  }
  return response.text().catch(() => null);
}
