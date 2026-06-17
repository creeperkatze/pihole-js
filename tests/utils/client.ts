import type { PiHoleClientOptions, SessionEntry, SessionStore } from '../../src/types/index.ts';
import { PiHoleClient } from '../../src/client/pihole.ts';
import { createMockFetch, type MockFetch } from './http.ts';

export class TestSessionStore implements SessionStore {
  readonly entries = new Map<string, SessionEntry>();
  readonly deleted: string[] = [];

  async get(baseUrl: string): Promise<SessionEntry | null> {
    return this.entries.get(baseUrl) ?? null;
  }

  async set(baseUrl: string, entry: SessionEntry): Promise<void> {
    this.entries.set(baseUrl, entry);
  }

  async delete(baseUrl: string): Promise<void> {
    this.deleted.push(baseUrl);
    this.entries.delete(baseUrl);
  }
}

interface CreateClientOptions {
  responses: Response[];
  options?: Partial<PiHoleClientOptions>;
  seedSession?: boolean;
}

export function createTestClient({
  responses,
  options = {},
  seedSession = true,
}: CreateClientOptions): { client: PiHoleClient; fetch: MockFetch; sessionStore: TestSessionStore } {
  const fetch = createMockFetch(...responses);
  const sessionStore = options.sessionStore instanceof TestSessionStore ? options.sessionStore : new TestSessionStore();

  if (seedSession) {
    sessionStore.entries.set('http://pi.hole', {
      sid: 'cached',
      expiresAt: Date.now() + 60_000,
    });
  }

  const client = new PiHoleClient({
    baseUrl: 'http://pi.hole',
    fetch,
    sessionStore,
    ...options,
  });

  return { client, fetch, sessionStore };
}
