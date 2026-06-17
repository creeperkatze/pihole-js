import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('getSummary fetches the padd endpoint', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({})],
  });

  await client.padd.getSummary();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/padd');
  expect(fetch.calls[0].init?.method ?? 'GET').toBe('GET');
});
