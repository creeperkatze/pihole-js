import test from 'node:test';
import assert from 'node:assert/strict';

import { createTestClient, TestSessionStore } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('checkAuth calls the unauthenticated auth endpoint', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ session: { valid: true } })],
    seedSession: false,
  });

  await client.auth.check();

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/auth');
  assert.equal(fetch.calls[0].init?.method ?? 'GET', 'GET');
  assert.equal((fetch.calls[0].init?.headers as Headers).has('sid'), false);
});

test('login with credentials posts the password body to /auth', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ session: { valid: true, sid: 'abc', validity: 60 } })],
    seedSession: false,
  });

  await client.auth.login({ password: 'secret' });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/auth');
  assert.equal(fetch.calls[0].init?.method, 'POST');
  assert.equal(fetch.calls[0].init?.body, JSON.stringify({ password: 'secret' }));
});

test('login without credentials reuses an existing session and fetches auth state', async () => {
  const store = new TestSessionStore();
  store.entries.set('http://pi.hole', { sid: 'cached', expiresAt: Date.now() + 60_000 });
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ session: { valid: true, sid: 'cached', validity: 60 } })],
    options: {
      sessionStore: store,
    },
  });

  await client.auth.login();

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/auth');
  assert.equal((fetch.calls[0].init?.headers as Headers).has('sid'), false);
  assert.deepEqual(await store.get('http://pi.hole'), { sid: 'cached', expiresAt: store.entries.get('http://pi.hole')?.expiresAt });
});

test('session management endpoints use the expected routes and methods', async () => {
  const store = new TestSessionStore();
  store.entries.set('http://pi.hole', { sid: 'cached', expiresAt: Date.now() + 60_000 });
  const { client, fetch, sessionStore } = createTestClient({
    responses: [
      jsonResponse({ sessions: [] }),
      jsonResponse({ totp: { enabled: true } }),
      new Response(null, { status: 204 }),
      jsonResponse({ password: 'app-token' }),
      new Response(null, { status: 204 }),
    ],
    options: { sessionStore: store },
  });

  await client.auth.getSessions();
  await client.auth.getTotp();
  await client.auth.deleteSession(123);
  await client.auth.createAppPassword();
  await client.auth.logout();

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/auth/sessions');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/auth/totp');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/auth/session/123');
  assert.equal(fetch.calls[2].init?.method, 'DELETE');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/auth/app');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/auth');
  assert.equal(fetch.calls[4].init?.method, 'DELETE');
  assert.deepEqual(sessionStore.deleted, ['http://pi.hole']);
});
