import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('CRUD operations build typed paths and encode domain names', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 }), new Response(null, { status: 204 })],
  });

  await client.domains.get('allow', 'exact', 'pi.hole/test');
  await client.domains.create('allow', 'exact', { domain: 'pi.hole' });
  await client.domains.update('deny', 'regex', 'a/b', { comment: 'x' });
  await client.domains.delete('deny', 'regex', 'a/b');
  await client.domains.batchDelete([{ item: 'x', type: 'allow', kind: 'exact' }]);

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/domains/allow/exact/pi.hole%2Ftest');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/domains/allow/exact');
  expect(fetch.calls[1].init?.method).toBe('POST');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/domains/deny/regex/a%2Fb');
  expect(fetch.calls[2].init?.method).toBe('PUT');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/domains/deny/regex/a%2Fb');
  expect(fetch.calls[3].init?.method).toBe('DELETE');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/domains:batchDelete');
});

test('list endpoints build the expected paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.domains.list();
  await client.domains.listByType('allow');
  await client.domains.listByKind('deny', 'regex');

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/domains');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/domains/allow');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/domains/deny/regex');
});

test('convenience helpers map to the correct typed endpoints', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({}),
      new Response(null, { status: 204 }),
      jsonResponse({}),
      jsonResponse({}),
      new Response(null, { status: 204 }),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
    ],
  });

  await client.domains.allow('example.com');
  await client.domains.unallow('example.com');
  await client.domains.getAllowlist();
  await client.domains.deny('bad.com');
  await client.domains.undeny('bad.com');
  await client.domains.getDenylist();
  await client.domains.allowRegex('^example\\.com$');
  await client.domains.denyRegex('^bad\\.com$');

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/domains/allow/exact');
  expect(fetch.calls[0].init?.method).toBe('POST');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/domains/allow/exact/example.com');
  expect(fetch.calls[1].init?.method).toBe('DELETE');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/domains/allow/exact');
  expect(fetch.calls[2].init?.method ?? 'GET').toBe('GET');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/domains/deny/exact');
  expect(fetch.calls[3].init?.method).toBe('POST');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/domains/deny/exact/bad.com');
  expect(fetch.calls[4].init?.method).toBe('DELETE');
  expect(String(fetch.calls[5].input)).toBe('http://pi.hole/api/domains/deny/exact');
  expect(fetch.calls[5].init?.method ?? 'GET').toBe('GET');
  expect(String(fetch.calls[6].input)).toBe('http://pi.hole/api/domains/allow/regex');
  expect(String(fetch.calls[7].input)).toBe('http://pi.hole/api/domains/deny/regex');
});

test('search encodes the domain name in the path and forwards query options', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({})],
  });

  await client.domains.search('pi.hole/test', { partial: true, N: 10 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/search/pi.hole%2Ftest?partial=true&N=10');
});
