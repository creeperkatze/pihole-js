import test from 'node:test';
import assert from 'node:assert/strict';

import { SystemClient } from '../../src/client/system.ts';
import { createTestClient } from '../utils/client.ts';
import { jsonResponse, textResponse } from '../utils/http.ts';

test('public info and docs endpoints skip session auth', async () => {
  const { client, fetch } = createTestClient({
    Client: SystemClient,
    responses: [jsonResponse({ client: {} }), jsonResponse({ login: {} }), textResponse('docs')],
  });

  await client.getInfoClient();
  await client.getInfoLogin();
  await client.getDocs();

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/info/client');
  assert.equal((fetch.calls[0].init?.headers as Headers).has('sid'), false);
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/info/login');
  assert.equal((fetch.calls[1].init?.headers as Headers).has('sid'), false);
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/docs');
});

test('message and config endpoints build the expected paths', async () => {
  const { client, fetch } = createTestClient({
    Client: SystemClient,
    responses: [jsonResponse({}), new Response(null, { status: 204 }), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 }), new Response(null, { status: 204 })],
  });

  await client.getInfoMessagesCount();
  await client.deleteInfoMessages([1, 'two']);
  await client.patchConfig({ dns: { blocking: { active: true } } } as never, { restart: true });
  await client.getConfigElement('/dns/upstreams', { detailed: true });
  await client.addConfigArrayItem('/dns/upstreams', '1.1.1.1', { restart: true });
  await client.deleteConfigArrayItem('/dns/upstreams', '1.1.1.1', { restart: true });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/info/messages/count');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/info/messages/1%2Ctwo');
  assert.equal(fetch.calls[1].init?.method, 'DELETE');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/config?restart=true');
  assert.equal(fetch.calls[2].init?.method, 'PATCH');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/config/dns/upstreams?detailed=true');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/config/dns/upstreams/1.1.1.1?restart=true');
  assert.equal(fetch.calls[4].init?.method, 'PUT');
  assert.equal(String(fetch.calls[5].input), 'http://pi.hole/api/config/dns/upstreams/1.1.1.1?restart=true');
  assert.equal(fetch.calls[5].init?.method, 'DELETE');
});

test('network, action, and search endpoints shape requests correctly', async () => {
  const { client, fetch } = createTestClient({
    Client: SystemClient,
    responses: [
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      jsonResponse({}),
      textResponse('gravity'),
      jsonResponse({ status: 'ok' }),
      new Response(null, { status: 204 }),
      jsonResponse({}),
    ],
  });

  await client.getNetworkDevices({ max_devices: 5 });
  await client.getNetworkGateway({ detailed: true });
  await client.getNetworkRoutes({ detailed: true });
  await client.getNetworkInterfaces({ detailed: true });
  await client.runGravity({ color: true });
  await client.restartDns();
  await client.deleteDhcpLease('192.168.1.2');
  await client.getSearch('pi.hole/test', { partial: true, N: 10 });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/network/devices?max_devices=5');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/network/gateway?detailed=true');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/network/routes?detailed=true');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/network/interfaces?detailed=true');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/action/gravity?color=true');
  assert.equal(fetch.calls[4].init?.method, 'POST');
  assert.equal(String(fetch.calls[5].input), 'http://pi.hole/api/action/restartdns');
  assert.equal(fetch.calls[5].init?.method, 'POST');
  assert.equal(String(fetch.calls[6].input), 'http://pi.hole/api/dhcp/leases/192.168.1.2');
  assert.equal(fetch.calls[6].init?.method, 'DELETE');
  assert.equal(String(fetch.calls[7].input), 'http://pi.hole/api/search/pi.hole%2Ftest?partial=true&N=10');
});
