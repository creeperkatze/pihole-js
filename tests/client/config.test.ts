import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('config endpoints build the expected paths and methods', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      new Response(null, { status: 204 }),
      new Response(null, { status: 204 }),
    ],
  });

  await client.config.get({ detailed: true });
  await client.config.patch({ dns: { blocking: { active: true } } } as never, { restart: true });
  await client.config.getSection('/dns/upstreams', { detailed: true });
  await client.config.addArrayItem('/dns/upstreams', '1.1.1.1', { restart: true });
  await client.config.removeArrayItem('/dns/upstreams', '1.1.1.1', { restart: true });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/config?detailed=true');
  expect(fetch.calls[0].init?.method ?? 'GET').toBe('GET');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/config?restart=true');
  expect(fetch.calls[1].init?.method).toBe('PATCH');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/config/dns/upstreams?detailed=true');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/config/dns/upstreams/1.1.1.1?restart=true');
  expect(fetch.calls[3].init?.method).toBe('PUT');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/config/dns/upstreams/1.1.1.1?restart=true');
  expect(fetch.calls[4].init?.method).toBe('DELETE');
});
