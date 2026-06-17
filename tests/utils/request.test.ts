import { test, expect } from 'vitest';

import {
  appendQuery,
  buildApiUrl,
  extractErrorMessage,
  isPlainObject,
  isRawBody,
  normalizeBaseUrl,
  parseErrorBody,
  withJsonBody,
} from '../../src/utils/request.ts';

test('normalizeBaseUrl trims trailing slashes and strips /api suffix', () => {
  expect(normalizeBaseUrl('http://pi.hole/api/')).toBe('http://pi.hole');
  expect(normalizeBaseUrl('http://pi.hole/admin/')).toBe('http://pi.hole/admin');
});

test('normalizeBaseUrl rejects empty values', () => {
  expect(() => normalizeBaseUrl('')).toThrow(/baseUrl must be a non-empty string/);
});

test('appendQuery skips nullish values and expands arrays', () => {
  const url = appendQuery(new URL('http://pi.hole/api/stats'), {
    count: 10,
    tags: ['a', 'b'],
    empty: undefined,
    disabled: null,
    enabled: true,
  });

  expect(url.toString()).toBe('http://pi.hole/api/stats?count=10&tags=a&tags=b&enabled=true');
});

test('buildApiUrl trims leading slashes from the path', () => {
  expect(buildApiUrl('http://pi.hole', '/dns/blocking')).toBe('http://pi.hole/api/dns/blocking');
});

test('isPlainObject only matches plain JSON-like objects', () => {
  expect(isPlainObject({ ok: true })).toBe(true);
  expect(isPlainObject(['nope'])).toBe(false);
  expect(isPlainObject(new FormData())).toBe(false);
  expect(isPlainObject(new Blob(['x']))).toBe(false);
  expect(isPlainObject(null)).toBe(false);
});

test('isRawBody recognizes supported raw request bodies', () => {
  expect(isRawBody('text')).toBe(true);
  expect(isRawBody(new FormData())).toBe(true);
  expect(isRawBody(new URLSearchParams('a=1'))).toBe(true);
  expect(isRawBody(new Blob(['x']))).toBe(true);
  expect(isRawBody(new Uint8Array([1, 2, 3]))).toBe(true);
  expect(isRawBody({ nope: true })).toBe(false);
});

test('withJsonBody JSON-encodes plain objects and sets content type', () => {
  const request = withJsonBody({
    method: 'POST',
    body: { enabled: true },
  });

  expect(request.body).toBe(JSON.stringify({ enabled: true }));
  expect(new Headers(request.headers).get('Content-Type')).toBe('application/json');
});

test('withJsonBody keeps raw bodies unchanged and does not force JSON headers', () => {
  const body = new URLSearchParams('a=1');
  const request = withJsonBody({
    method: 'POST',
    body,
  });

  expect(request.body).toBe(body);
  expect(new Headers(request.headers).has('Content-Type')).toBe(false);
});

test('extractErrorMessage prefers nested API messages and falls back to HTTP status', () => {
  expect(extractErrorMessage({ error: { message: 'Denied' } }, 403)).toBe('Denied');
  expect(extractErrorMessage({ message: 'Broken' }, 500)).toBe('Broken');
  expect(extractErrorMessage({}, 404)).toBe('HTTP 404');
});

test('parseErrorBody reads json responses', async () => {
  const body = await parseErrorBody(
    new Response(JSON.stringify({ error: { message: 'Oops' } }), {
      headers: { 'content-type': 'application/json' },
    }),
  );

  expect(body).toEqual({ error: { message: 'Oops' } });
});

test('parseErrorBody reads text responses', async () => {
  const body = await parseErrorBody(
    new Response('plain text', {
      headers: { 'content-type': 'text/plain' },
    }),
  );

  expect(body).toBe('plain text');
});
