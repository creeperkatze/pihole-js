import test from 'node:test';
import assert from 'node:assert/strict';

import { PiHoleClientCore } from '../../src/client/core.ts';
import { PiHoleError } from '../../src/errors.ts';
import type { AuthRequest, AuthResponse, PiHoleClientOptions, SessionStore } from '../../src/types/index.ts';
import {
  abortingFetch,
  binaryResponse,
  createMockFetch,
  jsonResponse,
  textResponse,
} from '../utils/http.ts';

class TestClient extends PiHoleClientCore {
  constructor(options: PiHoleClientOptions) {
    super(options);
  }

  json<T>(path: string, options?: TestRequestOptions): Promise<T> {
    return this.requestJson<T>(path, options);
  }

  text(path: string, options?: TestRequestOptions): Promise<string> {
    return this.requestText(path, options);
  }

  binary(path: string, options?: TestRequestOptions): Promise<ArrayBuffer> {
    return this.requestArrayBuffer(path, options);
  }

  void(path: string, options?: TestRequestOptions): Promise<void> {
    return this.requestVoid(path, options);
  }

  login(credentials: AuthRequest): Promise<AuthResponse> {
    return this.loginWithCredentials(credentials);
  }

  logout(): Promise<void> {
    return this.logoutSession();
  }
}

type TestRequestOptions = Omit<RequestInit, 'body'> & {
  auth?: 'session' | 'none';
  body?: BodyInit | object | object[] | null;
  parseAs?: 'json' | 'text' | 'arrayBuffer' | 'void';
  query?: object;
  sid?: string | null;
};

class TestSessionStore implements SessionStore {
  readonly entries = new Map<string, { sid: string; expiresAt?: number }>();
  readonly deleted: string[] = [];

  async get(baseUrl: string) {
    return this.entries.get(baseUrl) ?? null;
  }

  async set(baseUrl: string, entry: { sid: string; expiresAt?: number }) {
    this.entries.set(baseUrl, entry);
  }

  async delete(baseUrl: string) {
    this.deleted.push(baseUrl);
    this.entries.delete(baseUrl);
  }
}

test('requestJson authenticates with password, stores the session, and sends the sid header', async () => {
  const fetch = createMockFetch(
    jsonResponse({ session: { valid: true, sid: 'sid-1', validity: 120 } }),
    jsonResponse({ status: 'ok' }),
  );
  const store = new TestSessionStore();
  const client = new TestClient({
    baseUrl: 'http://pi.hole/api/',
    password: 'secret',
    fetch,
    sessionStore: store,
  });

  const response = await client.json<{ status: string }>('stats/summary');

  assert.deepEqual(response, { status: 'ok' });
  assert.equal(fetch.calls.length, 2);
  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/auth');
  assert.equal(fetch.calls[0].init?.method, 'POST');
  assert.equal(fetch.calls[1].init?.headers instanceof Headers, true);
  assert.equal((fetch.calls[1].init?.headers as Headers).get('sid'), 'sid-1');
  assert.deepEqual(await store.get('http://pi.hole'), {
    sid: 'sid-1',
    expiresAt: store.entries.get('http://pi.hole')?.expiresAt,
  });
  assert.ok((store.entries.get('http://pi.hole')?.expiresAt ?? 0) > Date.now());
});

test('requestJson reuses a cached session without re-authenticating', async () => {
  const fetch = createMockFetch(jsonResponse({ status: 'ok' }));
  const store = new TestSessionStore();
  store.entries.set('http://pi.hole', { sid: 'cached', expiresAt: Date.now() + 60_000 });
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    password: 'secret',
    fetch,
    sessionStore: store,
  });

  await client.json('stats/summary');

  assert.equal(fetch.calls.length, 1);
  assert.equal((fetch.calls[0].init?.headers as Headers).get('sid'), 'cached');
});

test('requestJson validates an expired cached session before reusing it', async () => {
  const fetch = createMockFetch(
    jsonResponse({ session: { valid: true, validity: 30 } }),
    jsonResponse({ status: 'ok' }),
  );
  const store = new TestSessionStore();
  store.entries.set('http://pi.hole', { sid: 'stale', expiresAt: Date.now() - 1 });
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
    sessionStore: store,
  });

  await client.json('stats/summary');

  assert.equal(fetch.calls.length, 2);
  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/auth');
  assert.equal((fetch.calls[0].init?.headers as Headers).get('sid'), 'stale');
  assert.equal((fetch.calls[1].init?.headers as Headers).get('sid'), 'stale');
});

test('requestJson retries once with a fresh session after a 401 response', async () => {
  const fetch = createMockFetch(
    jsonResponse({ status: 'ok' }, { status: 401 }),
    jsonResponse({ session: { valid: true, sid: 'fresh', validity: 60 } }),
    jsonResponse({ status: 'ok' }),
  );
  const store = new TestSessionStore();
  store.entries.set('http://pi.hole', { sid: 'expired', expiresAt: Date.now() + 60_000 });
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    password: 'secret',
    fetch,
    sessionStore: store,
  });

  const response = await client.json<{ status: string }>('stats/summary');

  assert.deepEqual(response, { status: 'ok' });
  assert.equal(fetch.calls.length, 3);
  assert.equal((fetch.calls[0].init?.headers as Headers).get('sid'), 'expired');
  assert.equal((fetch.calls[2].init?.headers as Headers).get('sid'), 'fresh');
  assert.deepEqual(store.deleted, ['http://pi.hole']);
});

test('requestJson supports passwordless installs', async () => {
  const fetch = createMockFetch(
    jsonResponse({ session: { valid: true, sid: 'passwordless', validity: 0 } }),
    jsonResponse({ status: 'ok' }),
  );
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
  });

  await client.json('stats/summary');

  assert.equal(fetch.calls.length, 2);
  assert.equal(fetch.calls[0].init?.method ?? 'GET', 'GET');
  assert.equal((fetch.calls[1].init?.headers as Headers).get('sid'), 'passwordless');
});

test('requestJson throws a friendly error when a passwordless install actually requires a password', async () => {
  const fetch = createMockFetch(jsonResponse({ session: { valid: false } }));
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
  });

  await assert.rejects(() => client.json('stats/summary'), (error: unknown) => {
    assert.ok(error instanceof PiHoleError);
    assert.equal(error.message, 'Password required');
    assert.equal(error.code, 'PASSWORD_REQUIRED');
    return true;
  });
});

test('loginWithCredentials remaps a 401 into PASSWORD_INCORRECT', async () => {
  const fetch = createMockFetch(jsonResponse({ error: { message: 'unauthorized' } }, { status: 401 }));
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    password: 'wrong',
    fetch,
  });

  await assert.rejects(() => client.json('stats/summary'), (error: unknown) => {
    assert.ok(error instanceof PiHoleError);
    assert.equal(error.message, 'Password incorrect');
    assert.equal(error.code, 'PASSWORD_INCORRECT');
    return true;
  });
});

test('requestText, requestArrayBuffer, and requestVoid use the right response parsers', async () => {
  const fetch = createMockFetch(
    textResponse('docs here'),
    binaryResponse(new Uint8Array([1, 2, 3])),
    new Response(null, { status: 204 }),
  );
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
  });

  const docs = await client.text('docs', { auth: 'none' });
  const buffer = await client.binary('teleporter', { auth: 'none' });
  const empty = await client.void('logout', { auth: 'none' });

  assert.equal(docs, 'docs here');
  assert.deepEqual(Array.from(new Uint8Array(buffer)), [1, 2, 3]);
  assert.equal(empty, undefined);
});

test('requestJson appends query params and JSON-encodes object bodies', async () => {
  const fetch = createMockFetch(jsonResponse({ status: 'ok' }));
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    userAgent: 'pihole-js-tests/1.0',
    fetch,
  });

  await client.json('groups', {
    auth: 'none',
    method: 'POST',
    query: { type: 'allow', ids: [1, 2] },
    body: { enabled: true },
  });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/groups?type=allow&ids=1&ids=2');
  assert.equal(fetch.calls[0].init?.body, JSON.stringify({ enabled: true }));
  assert.equal((fetch.calls[0].init?.headers as Headers).get('Content-Type'), 'application/json');
  assert.equal((fetch.calls[0].init?.headers as Headers).get('User-Agent'), 'pihole-js-tests/1.0');
});

test('requestJson forces the configured user agent over per-request headers', async () => {
  const fetch = createMockFetch(jsonResponse({ status: 'ok' }));
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    userAgent: 'pihole-js-tests/1.0',
    fetch,
  });

  await client.json('groups', {
    auth: 'none',
    headers: {
      'User-Agent': 'custom-agent/2.0',
    },
  });

  assert.equal((fetch.calls[0].init?.headers as Headers).get('User-Agent'), 'pihole-js-tests/1.0');
});

test('logout clears the cached session entry', async () => {
  const fetch = createMockFetch(new Response(null, { status: 204 }));
  const store = new TestSessionStore();
  store.entries.set('http://pi.hole', { sid: 'cached', expiresAt: Date.now() + 60_000 });
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
    sessionStore: store,
  });

  await client.logout();

  assert.deepEqual(store.deleted, ['http://pi.hole']);
});

test('requestJson turns aborted fetches into timeout errors', async () => {
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    timeoutMs: 1,
    fetch: createMockFetch(abortingFetch()),
  });

  await assert.rejects(() => client.json('docs', { auth: 'none' }), (error: unknown) => {
    assert.ok(error instanceof PiHoleError);
    assert.equal(error.message, 'Connection timed out');
    assert.equal(error.status, 408);
    assert.equal(error.code, 'TIMEOUT');
    return true;
  });
});

test('requestJson uses a bound default fetch implementation', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = function (this: typeof globalThis, input: RequestInfo | URL, init?: RequestInit) {
    assert.equal(this, globalThis);
    return Promise.resolve(jsonResponse({ ok: true }));
  } as typeof globalThis.fetch;

  try {
    const client = new TestClient({
      baseUrl: 'http://pi.hole',
    });

    const response = await client.json<{ ok: boolean }>('docs', { auth: 'none' });

    assert.deepEqual(response, { ok: true });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('requestJson surfaces API error messages and metadata', async () => {
  const fetch = createMockFetch(
    jsonResponse(
      {
        error: {
          key: 'FORBIDDEN',
          message: 'Nope',
        },
      },
      { status: 403 },
    ),
  );
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
  });

  await assert.rejects(() => client.json('docs', { auth: 'none' }), (error: unknown) => {
    assert.ok(error instanceof PiHoleError);
    assert.equal(error.message, 'Nope');
    assert.equal(error.status, 403);
    assert.equal(error.code, 'FORBIDDEN');
    return true;
  });
});
