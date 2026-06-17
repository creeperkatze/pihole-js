import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('list and getSuggestions use the expected paths and forward query params', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({ suggestions: [] })],
  });

  await client.queries.list({ domain: 'pi.hole', start: 5 });
  await client.queries.getSuggestions();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/queries?domain=pi.hole&start=5');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/queries/suggestions');
});
