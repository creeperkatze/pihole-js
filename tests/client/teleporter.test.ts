import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { binaryResponse, jsonResponse } from '../utils/http.ts';

test('export sends a GET request to the teleporter endpoint', async () => {
  const { client, fetch } = createTestClient({
    responses: [binaryResponse(new Uint8Array([1, 2, 3]))],
  });

  const result = await client.teleporter.export();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/teleporter');
  expect(fetch.calls[0].init?.method ?? 'GET').toBe('GET');
  expect(Array.from(new Uint8Array(result))).toEqual([1, 2, 3]);
});

test('import posts a FormData body to the teleporter endpoint', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ processed: {} })],
  });

  const archive = new Uint8Array([0x50, 0x4b]).buffer;
  await client.teleporter.import(archive, { domains: true });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/teleporter');
  expect(fetch.calls[0].init?.method).toBe('POST');
  expect(fetch.calls[0].init?.body).toBeInstanceOf(FormData);
});
