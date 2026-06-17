import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('group endpoints use collection and item routes', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      new Response(null, { status: 204 }),
      new Response(null, { status: 204 }),
    ],
  });

  await client.groups.list();
  await client.groups.get('Default Group');
  await client.groups.create({ name: 'Kids' });
  await client.groups.update('Kids', { enabled: true });
  await client.groups.delete('Kids');
  await client.groups.batchDelete([{ item: 'Kids' }]);

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/groups');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/groups/Default%20Group');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/groups');
  expect(fetch.calls[2].init?.method).toBe('POST');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/groups/Kids');
  expect(fetch.calls[3].init?.method).toBe('PUT');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/groups/Kids');
  expect(fetch.calls[4].init?.method).toBe('DELETE');
  expect(String(fetch.calls[5].input)).toBe('http://pi.hole/api/groups:batchDelete');
});
