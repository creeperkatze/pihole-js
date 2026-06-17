import { test, expect } from 'vitest';

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

  expect(response).toEqual({ status: 'ok' });
  expect(fetch.calls.length).toBe(2);
  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/auth');
  expect(fetch.calls[0].init?.method).toBe('POST');
  expect(fetch.calls[1].init?.headers instanceof Headers).toBe(true);
  expect((fetch.calls[1].init?.headers as Headers).get('sid')).toBe('sid-1');
  expect(await store.get('http://pi.hole')).toEqual({
    sid: 'sid-1',
    expiresAt: store.entries.get('http://pi.hole')?.expiresAt,
  });
  expect((store.entries.get('http://pi.hole')?.expiresAt ?? 0) > Date.now()).toBe(true);
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

  expect(fetch.calls.length).toBe(1);
  expect((fetch.calls[0].init?.headers as Headers).get('sid')).toBe('cached');
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

  expect(fetch.calls.length).toBe(2);
  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/auth');
  expect((fetch.calls[0].init?.headers as Headers).get('sid')).toBe('stale');
  expect((fetch.calls[1].init?.headers as Headers).get('sid')).toBe('stale');
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

  expect(response).toEqual({ status: 'ok' });
  expect(fetch.calls.length).toBe(3);
  expect((fetch.calls[0].init?.headers as Headers).get('sid')).toBe('expired');
  expect((fetch.calls[2].init?.headers as Headers).get('sid')).toBe('fresh');
  expect(store.deleted).toEqual(['http://pi.hole']);
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

  expect(fetch.calls.length).toBe(2);
  expect(fetch.calls[0].init?.method ?? 'GET').toBe('GET');
  expect((fetch.calls[1].init?.headers as Headers).get('sid')).toBe('passwordless');
});

test('requestJson throws a friendly error when a passwordless install actually requires a password', async () => {
  const fetch = createMockFetch(jsonResponse({ session: { valid: false } }));
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    fetch,
  });

  const error = await client.json('stats/summary').catch((e: unknown) => e);
  expect(error).toBeInstanceOf(PiHoleError);
  expect((error as PiHoleError).message).toBe('Password required');
  expect((error as PiHoleError).code).toBe('PASSWORD_REQUIRED');
});

test('loginWithCredentials remaps a 401 into PASSWORD_INCORRECT', async () => {
  const fetch = createMockFetch(jsonResponse({ error: { message: 'unauthorized' } }, { status: 401 }));
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    password: 'wrong',
    fetch,
  });

  const error = await client.json('stats/summary').catch((e: unknown) => e);
  expect(error).toBeInstanceOf(PiHoleError);
  expect((error as PiHoleError).message).toBe('Password incorrect');
  expect((error as PiHoleError).code).toBe('PASSWORD_INCORRECT');
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

  expect(docs).toBe('docs here');
  expect(Array.from(new Uint8Array(buffer))).toEqual([1, 2, 3]);
  expect(empty).toBeUndefined();
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

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/groups?type=allow&ids=1&ids=2');
  expect(fetch.calls[0].init?.body).toBe(JSON.stringify({ enabled: true }));
  expect((fetch.calls[0].init?.headers as Headers).get('Content-Type')).toBe('application/json');
  expect((fetch.calls[0].init?.headers as Headers).get('User-Agent')).toBe('pihole-js-tests/1.0');
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

  expect((fetch.calls[0].init?.headers as Headers).get('User-Agent')).toBe('pihole-js-tests/1.0');
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

  expect(store.deleted).toEqual(['http://pi.hole']);
});

test('requestJson turns aborted fetches into timeout errors', async () => {
  const client = new TestClient({
    baseUrl: 'http://pi.hole',
    timeoutMs: 1,
    fetch: createMockFetch(abortingFetch()),
  });

  const error = await client.json('docs', { auth: 'none' }).catch((e: unknown) => e);
  expect(error).toBeInstanceOf(PiHoleError);
  expect((error as PiHoleError).message).toBe('Connection timed out');
  expect((error as PiHoleError).status).toBe(408);
  expect((error as PiHoleError).code).toBe('TIMEOUT');
});

test('requestJson uses a bound default fetch implementation', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = function (this: typeof globalThis, _input: RequestInfo | URL, _init?: RequestInit) {
    expect(this).toBe(globalThis);
    return Promise.resolve(jsonResponse({ ok: true }));
  } as typeof globalThis.fetch;

  try {
    const client = new TestClient({
      baseUrl: 'http://pi.hole',
    });

    const response = await client.json<{ ok: boolean }>('docs', { auth: 'none' });

    expect(response).toEqual({ ok: true });
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

  const error = await client.json('docs', { auth: 'none' }).catch((e: unknown) => e);
  expect(error).toBeInstanceOf(PiHoleError);
  expect((error as PiHoleError).message).toBe('Nope');
  expect((error as PiHoleError).status).toBe(403);
  expect((error as PiHoleError).code).toBe('FORBIDDEN');
});
