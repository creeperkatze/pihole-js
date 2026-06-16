import test from 'node:test';
import assert from 'node:assert/strict';

import { ManagementClient } from '../../src/client/management.ts';
import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('domain endpoints build typed paths and encode domain names', async () => {
  const { client, fetch } = createTestClient({
    Client: ManagementClient,
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 }), new Response(null, { status: 204 })],
  });

  await client.getDomains({ type: 'allow', kind: 'exact', domain: 'pi.hole/test' });
  await client.createDomain('allow', 'exact', { domain: 'pi.hole' });
  await client.replaceDomain('deny', 'regex', 'a/b', { comment: 'x' });
  await client.deleteDomain('deny', 'regex', 'a/b');
  await client.deleteDomains([{ item: 'x', type: 'allow', kind: 'exact' }]);

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/domains/allow/exact/pi.hole%2Ftest');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/domains/allow/exact');
  assert.equal(fetch.calls[1].init?.method, 'POST');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/domains/deny/regex/a%2Fb');
  assert.equal(fetch.calls[2].init?.method, 'PUT');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/domains/deny/regex/a%2Fb');
  assert.equal(fetch.calls[3].init?.method, 'DELETE');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/domains:batchDelete');
});

test('group and client endpoints use collection and item routes', async () => {
  const { client, fetch } = createTestClient({
    Client: ManagementClient,
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 })],
  });

  await client.getGroups('Default Group');
  await client.createGroup({ name: 'Kids' });
  await client.replaceClient('Laptop / 1', { groups: [1] });
  await client.getClients();
  await client.getClientSuggestions();
  await client.deleteClients([{ item: 'Laptop' }]);

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/groups/Default%20Group');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/groups');
  assert.equal(fetch.calls[1].init?.method, 'POST');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/clients/Laptop%20%2F%201');
  assert.equal(fetch.calls[2].init?.method, 'PUT');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/clients');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/clients/_suggestions');
  assert.equal(String(fetch.calls[5].input), 'http://pi.hole/api/clients:batchDelete');
});

test('list endpoints attach type query params where required', async () => {
  const { client, fetch } = createTestClient({
    Client: ManagementClient,
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 }), new Response(null, { status: 204 })],
  });

  await client.getLists('https://example.com/list.txt', { type: 'allow' });
  await client.createList('block', { address: 'https://example.com/list.txt' });
  await client.replaceList('https://example.com/list.txt', { type: 'allow', comment: 'updated' });
  await client.deleteList('https://example.com/list.txt', 'block');
  await client.deleteLists([{ item: 'https://example.com/list.txt', type: 'allow' }]);

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/lists/https%3A%2F%2Fexample.com%2Flist.txt?type=allow');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/lists?type=block');
  assert.equal(fetch.calls[1].init?.method, 'POST');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/lists/https%3A%2F%2Fexample.com%2Flist.txt?type=allow');
  assert.equal(fetch.calls[2].init?.method, 'PUT');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/lists/https%3A%2F%2Fexample.com%2Flist.txt?type=block');
  assert.equal(fetch.calls[3].init?.method, 'DELETE');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/lists:batchDelete');
});
