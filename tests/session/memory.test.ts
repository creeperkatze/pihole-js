import { test, expect } from 'vitest';

import { MemorySessionStore } from '../../src/session/memory.ts';

test('MemorySessionStore returns null for unknown sessions', async () => {
  const store = new MemorySessionStore();

  expect(await store.get('http://pi.hole')).toBeNull();
});

test('MemorySessionStore persists and deletes session entries', async () => {
  const store = new MemorySessionStore();

  await store.set('http://pi.hole', { sid: 'abc', expiresAt: 123 });
  expect(await store.get('http://pi.hole')).toEqual({ sid: 'abc', expiresAt: 123 });

  await store.delete('http://pi.hole');
  expect(await store.get('http://pi.hole')).toBeNull();
});
