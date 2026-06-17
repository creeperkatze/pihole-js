import type { SessionEntry, SessionStore } from '../types/index.js';

/**
 * In-memory implementation of {@link SessionStore}.
 *
 * Each client instance gets its own store by default unless one is provided explicitly.
 */
export class MemorySessionStore implements SessionStore {
  readonly #store = new Map<string, SessionEntry>();

  async get(baseUrl: string): Promise<SessionEntry | null> {
    return this.#store.get(baseUrl) ?? null;
  }

  async set(baseUrl: string, entry: SessionEntry): Promise<void> {
    this.#store.set(baseUrl, entry);
  }

  async delete(baseUrl: string): Promise<void> {
    this.#store.delete(baseUrl);
  }
}
