import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('getClient and getLogin skip session auth', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ client: {} }), jsonResponse({ login: {} })],
  });

  await client.info.getClient();
  await client.info.getLogin();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/info/client');
  expect((fetch.calls[0].init?.headers as Headers).has('sid')).toBe(false);
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/info/login');
  expect((fetch.calls[1].init?.headers as Headers).has('sid')).toBe(false);
});

test('info endpoints build the expected paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
    ],
  });

  await client.info.getSystem();
  await client.info.getDatabase();
  await client.info.getFtl();
  await client.info.getHost();
  await client.info.getSensors();
  await client.info.getVersion();
  await client.info.getMetrics();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/info/system');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/info/database');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/info/ftl');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/info/host');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/info/sensors');
  expect(String(fetch.calls[5].input)).toBe('http://pi.hole/api/info/version');
  expect(String(fetch.calls[6].input)).toBe('http://pi.hole/api/info/metrics');
});

test('message endpoints use the expected paths and methods', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), new Response(null, { status: 204 }), jsonResponse({ count: 3 })],
  });

  await client.info.getMessages();
  await client.info.deleteMessage(1);
  await client.info.getMessagesCount();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/info/messages');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/info/messages/1');
  expect(fetch.calls[1].init?.method).toBe('DELETE');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/info/messages/count');
});
