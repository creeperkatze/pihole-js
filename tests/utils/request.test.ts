import test from 'node:test';
import assert from 'node:assert/strict';

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
  assert.equal(normalizeBaseUrl('http://pi.hole/api/'), 'http://pi.hole');
  assert.equal(normalizeBaseUrl('http://pi.hole/admin/'), 'http://pi.hole/admin');
});

test('normalizeBaseUrl rejects empty values', () => {
  assert.throws(() => normalizeBaseUrl(''), /baseUrl must be a non-empty string/);
});

test('appendQuery skips nullish values and expands arrays', () => {
  const url = appendQuery(new URL('http://pi.hole/api/stats'), {
    count: 10,
    tags: ['a', 'b'],
    empty: undefined,
    disabled: null,
    enabled: true,
  });

  assert.equal(url.toString(), 'http://pi.hole/api/stats?count=10&tags=a&tags=b&enabled=true');
});

test('buildApiUrl trims leading slashes from the path', () => {
  assert.equal(buildApiUrl('http://pi.hole', '/dns/blocking'), 'http://pi.hole/api/dns/blocking');
});

test('isPlainObject only matches plain JSON-like objects', () => {
  assert.equal(isPlainObject({ ok: true }), true);
  assert.equal(isPlainObject(['nope']), false);
  assert.equal(isPlainObject(new FormData()), false);
  assert.equal(isPlainObject(new Blob(['x'])), false);
  assert.equal(isPlainObject(null), false);
});

test('isRawBody recognizes supported raw request bodies', () => {
  assert.equal(isRawBody('text'), true);
  assert.equal(isRawBody(new FormData()), true);
  assert.equal(isRawBody(new URLSearchParams('a=1')), true);
  assert.equal(isRawBody(new Blob(['x'])), true);
  assert.equal(isRawBody(new Uint8Array([1, 2, 3])), true);
  assert.equal(isRawBody({ nope: true }), false);
});

test('withJsonBody JSON-encodes plain objects and sets content type', () => {
  const request = withJsonBody({
    method: 'POST',
    body: { enabled: true },
  });

  assert.equal(request.body, JSON.stringify({ enabled: true }));
  assert.equal(new Headers(request.headers).get('Content-Type'), 'application/json');
});

test('withJsonBody keeps raw bodies unchanged and does not force JSON headers', () => {
  const body = new URLSearchParams('a=1');
  const request = withJsonBody({
    method: 'POST',
    body,
  });

  assert.equal(request.body, body);
  assert.equal(new Headers(request.headers).has('Content-Type'), false);
});

test('extractErrorMessage prefers nested API messages and falls back to HTTP status', () => {
  assert.equal(extractErrorMessage({ error: { message: 'Denied' } }, 403), 'Denied');
  assert.equal(extractErrorMessage({ message: 'Broken' }, 500), 'Broken');
  assert.equal(extractErrorMessage({}, 404), 'HTTP 404');
});

test('parseErrorBody reads json responses', async () => {
  const body = await parseErrorBody(
    new Response(JSON.stringify({ error: { message: 'Oops' } }), {
      headers: { 'content-type': 'application/json' },
    }),
  );

  assert.deepEqual(body, { error: { message: 'Oops' } });
});

test('parseErrorBody reads text responses', async () => {
  const body = await parseErrorBody(
    new Response('plain text', {
      headers: { 'content-type': 'text/plain' },
    }),
  );

  assert.equal(body, 'plain text');
});
