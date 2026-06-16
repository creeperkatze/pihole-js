import test from 'node:test';
import assert from 'node:assert/strict';

import { MemorySessionStore } from '../../src/session/memory.ts';

test('MemorySessionStore returns null for unknown sessions', async () => {
  const store = new MemorySessionStore();

  assert.equal(await store.get('http://pi.hole'), null);
});

test('MemorySessionStore persists and deletes session entries', async () => {
  const store = new MemorySessionStore();

  await store.set('http://pi.hole', { sid: 'abc', expiresAt: 123 });
  assert.deepEqual(await store.get('http://pi.hole'), { sid: 'abc', expiresAt: 123 });

  await store.delete('http://pi.hole');
  assert.equal(await store.get('http://pi.hole'), null);
});
