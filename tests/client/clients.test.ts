import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('client endpoints use collection and item routes', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      new Response(null, { status: 204 }),
      jsonResponse({}),
      new Response(null, { status: 204 }),
    ],
  });

  await client.clients.list();
  await client.clients.get('192.168.1.1');
  await client.clients.create({ client: '192.168.1.2' });
  await client.clients.update('Laptop / 1', { groups: [1] });
  await client.clients.delete('Laptop');
  await client.clients.getSuggestions();
  await client.clients.batchDelete([{ item: 'Laptop' }]);

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/clients');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/clients/192.168.1.1');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/clients');
  expect(fetch.calls[2].init?.method).toBe('POST');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/clients/Laptop%20%2F%201');
  expect(fetch.calls[3].init?.method).toBe('PUT');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/clients/Laptop');
  expect(fetch.calls[4].init?.method).toBe('DELETE');
  expect(String(fetch.calls[5].input)).toBe('http://pi.hole/api/clients/_suggestions');
  expect(String(fetch.calls[6].input)).toBe('http://pi.hole/api/clients:batchDelete');
});
