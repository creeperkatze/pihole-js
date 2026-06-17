import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('list endpoints attach type query params where required', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 }), new Response(null, { status: 204 })],
  });

  await client.lists.get('https://example.com/list.txt', { type: 'allow' });
  await client.lists.create('block', { address: 'https://example.com/list.txt' });
  await client.lists.update('https://example.com/list.txt', { type: 'allow', comment: 'updated' });
  await client.lists.delete('https://example.com/list.txt', 'block');
  await client.lists.batchDelete([{ item: 'https://example.com/list.txt', type: 'allow' }]);

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/lists/https%3A%2F%2Fexample.com%2Flist.txt?type=allow');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/lists?type=block');
  expect(fetch.calls[1].init?.method).toBe('POST');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/lists/https%3A%2F%2Fexample.com%2Flist.txt?type=allow');
  expect(fetch.calls[2].init?.method).toBe('PUT');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/lists/https%3A%2F%2Fexample.com%2Flist.txt?type=block');
  expect(fetch.calls[3].init?.method).toBe('DELETE');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/lists:batchDelete');
});
