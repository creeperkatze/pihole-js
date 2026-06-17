import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('metrics summary and upstream endpoints use the expected paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.metrics.getSummary();
  await client.metrics.getUpstreams();
  await client.metrics.getDatabaseUpstreams({ from: 1, until: 2 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/stats/summary');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/stats/upstreams');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/stats/database/upstreams?from=1&until=2');
});

test('top stats switch between realtime and database endpoints', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.metrics.getTopDomains({ count: 10 });
  await client.metrics.getDatabaseTopDomains({ from: 1, until: 2, blocked: true });
  await client.metrics.getTopClients({ blocked: false });
  await client.metrics.getDatabaseTopClients({ from: 1, until: 2 });
  await client.metrics.getQueryTypes();
  await client.metrics.getDatabaseQueryTypes({ from: 1, until: 2 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/stats/top_domains?count=10');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/stats/database/top_domains?from=1&until=2&blocked=true');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/stats/top_clients?blocked=false');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/stats/database/top_clients?from=1&until=2');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/stats/query_types');
  expect(String(fetch.calls[5].input)).toBe('http://pi.hole/api/stats/database/query_types?from=1&until=2');
});

test('history and query endpoints forward query params', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.metrics.getHistory();
  await client.metrics.getHistoryClients({ N: 5 });
  await client.metrics.getHistoryDatabase({ from: 10, until: 20 });
  await client.metrics.getHistoryDatabaseClients({ from: 10, until: 20 });
  await client.metrics.getQueries({ domain: 'pi.hole', start: 5 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/history');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/history/clients?N=5');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/history/database?from=10&until=20');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/history/database/clients?from=10&until=20');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/queries?domain=pi.hole&start=5');
});

test('blocking endpoints use the correct method and body', async () => {
  const { client, fetch } = createTestClient({
    responses: [
      jsonResponse({ blocking: 'enabled' }),
      jsonResponse({ blocking: 'disabled' }),
      jsonResponse({ suggestions: [] }),
      jsonResponse({ blocked: [] }),
      jsonResponse({ database: {} }),
    ],
  });

  await client.dns.getBlocking();
  await client.dns.setBlocking(false, 30);
  await client.metrics.getQuerySuggestions();
  await client.metrics.getRecentBlocked(25);
  await client.metrics.getDatabaseSummary({ from: 1, until: 2 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/dns/blocking');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/dns/blocking');
  expect(fetch.calls[1].init?.method).toBe('POST');
  expect(fetch.calls[1].init?.body).toBe(JSON.stringify({ blocking: false, timer: 30 }));
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/queries/suggestions');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/stats/recent_blocked?count=25');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/stats/database/summary?from=1&until=2');
});
