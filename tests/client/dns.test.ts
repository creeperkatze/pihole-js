import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('getStatus and setBlocking use the correct method and body', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({ blocking: 'enabled' }),
      jsonResponse({ blocking: 'disabled' }),
    ],
  });

  await client.dns.getStatus();
  await client.dns.setBlocking(false, 30);

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/dns/blocking');
  expect(fetch.calls[0].init?.method ?? 'GET').toBe('GET');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/dns/blocking');
  expect(fetch.calls[1].init?.method).toBe('POST');
  expect(fetch.calls[1].init?.body).toBe(JSON.stringify({ blocking: false, timer: 30 }));
});

test('enable and disable are convenience wrappers for setBlocking', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ blocking: 'enabled' }), jsonResponse({ blocking: 'disabled' })],
  });

  await client.dns.enable();
  await client.dns.disable(60);

  expect(fetch.calls[0].init?.body).toBe(JSON.stringify({ blocking: true, timer: null }));
  expect(fetch.calls[1].init?.body).toBe(JSON.stringify({ blocking: false, timer: 60 }));
});
