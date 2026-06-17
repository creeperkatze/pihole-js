import test from 'node:test';
import assert from 'node:assert/strict';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse, textResponse } from '../utils/http.ts';

test('public info and docs endpoints skip session auth', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ client: {} }), jsonResponse({ login: {} }), textResponse('docs')],
  });

  await client.info.getClient();
  await client.info.getLogin();
  await client.docs.getHtml();

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/info/client');
  assert.equal((fetch.calls[0].init?.headers as Headers).has('sid'), false);
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/info/login');
  assert.equal((fetch.calls[1].init?.headers as Headers).has('sid'), false);
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/docs');
});

test('message and config endpoints build the expected paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), new Response(null, { status: 204 }), jsonResponse({}), jsonResponse({}), new Response(null, { status: 204 }), new Response(null, { status: 204 })],
  });

  await client.info.getMessagesCount();
  await client.info.deleteMessages([1, 'two']);
  await client.config.patch({ dns: { blocking: { active: true } } } as never, { restart: true });
  await client.config.getElement('/dns/upstreams', { detailed: true });
  await client.config.addArrayItem('/dns/upstreams', '1.1.1.1', { restart: true });
  await client.config.deleteArrayItem('/dns/upstreams', '1.1.1.1', { restart: true });

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

  await client.network.getDevices({ max_devices: 5 });
  await client.network.getGateway({ detailed: true });
  await client.network.getRoutes({ detailed: true });
  await client.network.getInterfaces({ detailed: true });
  await client.actions.runGravity({ color: true });
  await client.actions.restartDns();
  await client.dhcp.deleteLease('192.168.1.2');
  await client.search.lookup('pi.hole/test', { partial: true, N: 10 });

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
