import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { textResponse } from '../utils/http.ts';

test('getHtml fetches the docs endpoint without session auth', async () => {
  const { client, fetch } = createTestClient({
    responses: [textResponse('docs content')],
  });

  const result = await client.docs.getHtml();

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/docs');
  expect((fetch.calls[0].init?.headers as Headers).has('sid')).toBe(false);
  expect(result).toBe('docs content');
});
