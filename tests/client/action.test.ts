import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse, textResponse } from '../utils/http.ts';

test('action endpoints use the correct method and paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      textResponse('gravity output'),
      jsonResponse({ status: 'ok' }),
      jsonResponse({ status: 'ok' }),
      jsonResponse({ status: 'ok' }),
      jsonResponse({ status: 'ok' }),
    ],
  });

  await client.actions.updateGravity({ color: true });
  await client.actions.restartDns();
  await client.actions.flushLogs();
  await client.actions.flushArp();
  await client.actions.flushNetwork();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/action/gravity?color=true');
  expect(fetch.calls[0].init?.method).toBe('POST');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/action/restartdns');
  expect(fetch.calls[1].init?.method).toBe('POST');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/action/flush/logs');
  expect(fetch.calls[2].init?.method).toBe('POST');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/action/flush/arp');
  expect(fetch.calls[3].init?.method).toBe('POST');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/action/flush/network');
  expect(fetch.calls[4].init?.method).toBe('POST');
});
