import test from 'node:test';
import assert from 'node:assert/strict';

import { MemorySessionStore, PiHoleClient } from './client.js';

test('MemorySessionStore stores and deletes sessions', async () => {
  const store = new MemorySessionStore();
  await store.set('http://pi.hole', { sid: 'abc', expiresAt: 123 });
  assert.deepEqual(await store.get('http://pi.hole'), { sid: 'abc', expiresAt: 123 });
  await store.delete('http://pi.hole');
  assert.equal(await store.get('http://pi.hole'), null);
});

test('PiHoleClient validates baseUrl and timeout', () => {
  assert.throws(() => new PiHoleClient({ baseUrl: '', fetch: async () => new Response() }), /baseUrl/);
  assert.throws(
    () => new PiHoleClient({ baseUrl: 'http://pi.hole', timeoutMs: 0, fetch: async () => new Response() }),
    /timeoutMs/,
  );
});
