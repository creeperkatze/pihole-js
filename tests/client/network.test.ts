import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('network endpoints build the expected paths and forward query options', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({}),
      new Response(null, { status: 204 }),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
    ],
  });

  await client.network.getDevices({ max_devices: 5 });
  await client.network.deleteDevice(42);
  await client.network.getGateway({ detailed: true });
  await client.network.getRoutes({ detailed: true });
  await client.network.getInterfaces({ detailed: true });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/network/devices?max_devices=5');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/network/devices/42');
  expect(fetch.calls[1].init?.method).toBe('DELETE');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/network/gateway?detailed=true');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/network/routes?detailed=true');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/network/interfaces?detailed=true');
});
