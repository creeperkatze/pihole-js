import test from 'node:test';
import assert from 'node:assert/strict';

import { MetricsClient } from '../../src/client/metrics.ts';
import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('metrics summary and upstream endpoints use the expected paths', async () => {
  const { client, fetch } = createTestClient({
    Client: MetricsClient,
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.getStatsSummary();
  await client.getStatsUpstreams();
  await client.getStatsDatabaseUpstreams({ from: 1, until: 2 });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/stats/summary');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/stats/upstreams');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/stats/database/upstreams?from=1&until=2');
});

test('top stats switch between realtime and database endpoints', async () => {
  const { client, fetch } = createTestClient({
    Client: MetricsClient,
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.getStatsTopDomains();
  await client.getStatsTopDomains({ from: 1, until: 2 });
  await client.getStatsTopClients();
  await client.getStatsTopClients({ from: 1, until: 2 });
  await client.getStatsQueryTypes();
  await client.getStatsQueryTypes({ from: 1, until: 2 });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/stats/top_domains');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/stats/database/top_domains?from=1&until=2');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/stats/top_clients');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/stats/database/top_clients?from=1&until=2');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/stats/query_types');
  assert.equal(String(fetch.calls[5].input), 'http://pi.hole/api/stats/database/query_types?from=1&until=2');
});

test('history and query endpoints forward query params', async () => {
  const { client, fetch } = createTestClient({
    Client: MetricsClient,
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.getHistory();
  await client.getHistoryClients({ N: 5 });
  await client.getHistoryDatabase({ from: 10, until: 20 });
  await client.getHistoryDatabaseClients({ from: 10, until: 20 });
  await client.getQueries({ domain: 'pi.hole', start: 5 });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/history');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/history/clients?N=5');
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/history/database?from=10&until=20');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/history/database/clients?from=10&until=20');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/queries?domain=pi.hole&start=5');
});

test('blocking endpoints use the correct method and body', async () => {
  const { client, fetch } = createTestClient({
    Client: MetricsClient,
    responses: [
      jsonResponse({ blocking: 'enabled' }),
      jsonResponse({ blocking: 'disabled' }),
      jsonResponse({ suggestions: [] }),
      jsonResponse({ blocked: [] }),
      jsonResponse({ database: {} }),
    ],
  });

  await client.getBlocking();
  await client.updateBlocking(false, 30);
  await client.getQuerySuggestions();
  await client.getStatsRecentBlocked(25);
  await client.getStatsDatabaseSummary({ from: 1, until: 2 });

  assert.equal(String(fetch.calls[0].input), 'http://pi.hole/api/dns/blocking');
  assert.equal(String(fetch.calls[1].input), 'http://pi.hole/api/dns/blocking');
  assert.equal(fetch.calls[1].init?.method, 'POST');
  assert.equal(fetch.calls[1].init?.body, JSON.stringify({ blocking: false, timer: 30 }));
  assert.equal(String(fetch.calls[2].input), 'http://pi.hole/api/queries/suggestions');
  assert.equal(String(fetch.calls[3].input), 'http://pi.hole/api/stats/recent_blocked?count=25');
  assert.equal(String(fetch.calls[4].input), 'http://pi.hole/api/stats/database/summary?from=1&until=2');
});
