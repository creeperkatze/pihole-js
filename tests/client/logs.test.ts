import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('log endpoints build the expected paths and forward query options', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.logs.getDnsmasq({ nextID: 0 });
  await client.logs.getFtl();
  await client.logs.getWebserver({ nextID: 50 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/logs/dnsmasq?nextID=0');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/logs/ftl');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/logs/webserver?nextID=50');
});
