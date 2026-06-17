import { test, expect } from 'vitest';

import { createTestClient } from '../utils/client.ts';
import { jsonResponse } from '../utils/http.ts';

test('getSummary, getUpstreams, and getDatabaseUpstreams use the expected paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.stats.getSummary();
  await client.stats.getUpstreams();
  await client.stats.getDatabaseUpstreams({ from: 1, until: 2 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/stats/summary');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/stats/upstreams');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/stats/database/upstreams?from=1&until=2');
});

test('top domain, client, and query type endpoints switch between realtime and database variants', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({}), jsonResponse({})],
  });

  await client.stats.getTopDomains({ count: 10 });
  await client.stats.getDatabaseTopDomains({ from: 1, until: 2, blocked: true });
  await client.stats.getTopClients({ blocked: false });
  await client.stats.getDatabaseTopClients({ from: 1, until: 2 });
  await client.stats.getQueryTypes();
  await client.stats.getDatabaseQueryTypes({ from: 1, until: 2 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/stats/top_domains?count=10');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/stats/database/top_domains?from=1&until=2&blocked=true');
  expect(String(fetch.calls[2].input)).toBe('http://pi.hole/api/stats/top_clients?blocked=false');
  expect(String(fetch.calls[3].input)).toBe('http://pi.hole/api/stats/database/top_clients?from=1&until=2');
  expect(String(fetch.calls[4].input)).toBe('http://pi.hole/api/stats/query_types');
  expect(String(fetch.calls[5].input)).toBe('http://pi.hole/api/stats/database/query_types?from=1&until=2');
});

test('getRecentBlocked and getDatabaseSummary use the expected paths', async () => {
  const { client, fetch } = createTestClient({
    responses: [jsonResponse({ blocked: [] }), jsonResponse({ database: {} })],
  });

  await client.stats.getRecentBlocked(25);
  await client.stats.getDatabaseSummary({ from: 1, until: 2 });

  expect(String(fetch.calls[0].input)).toBe('http://pi.hole/api/stats/recent_blocked?count=25');
  expect(String(fetch.calls[1].input)).toBe('http://pi.hole/api/stats/database/summary?from=1&until=2');
});
