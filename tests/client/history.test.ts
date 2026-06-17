import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('history endpoints forward query params correctly', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.history.get();
  await client.history.getClients({ N: 5 });
  await client.history.getDatabase({ from: 10, until: 20 });
  await client.history.getDatabaseClients({ from: 10, until: 20 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/history');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/history/clients?N=5');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/history/database?from=10&until=20');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/history/database/clients?from=10&until=20');
});
