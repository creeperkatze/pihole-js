import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('getLeases and deleteLease use the expected paths and methods', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ leases: [] }), new Response(null, { status: 204 })],
  });

  await client.dhcp.getLeases();
  await client.dhcp.deleteLease('192.168.1.2');

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/dhcp/leases');
  expect(fetch.calls[0].init?.method ?? 'GET').toBe('GET');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/dhcp/leases/192.168.1.2');
  expect(fetch.calls[1].init?.method).toBe('DELETE');
});
