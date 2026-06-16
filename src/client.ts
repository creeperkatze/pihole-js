import { PiHoleError } from './errors.js';
import type {
  AuthResponse,
  BlockingStatus,
  DomainSearchResult,
  HistoryPoint,
  PiholeDiagnosis,
  PiholeGroup,
  PiHoleClientOptions,
  PiholeList,
  PiholeSummary,
  SessionEntry,
  SessionStore,
} from './types.js';

interface RequestOptions extends RequestInit {
  noBody?: boolean;
  sid?: string;
  useSession?: boolean;
}

interface SummaryStatsResponse {
  queries: PiholeSummary['queries'];
  clients: PiholeSummary['clients'];
}

interface HistoryResponse {
  history: HistoryPoint[];
}

interface GroupsResponse {
  groups: PiholeGroup[];
}

interface ListsResponse {
  lists: PiholeList[];
}

interface PaddResponse {
  '%cpu'?: number;
  '%mem'?: number;
  sensors?: { cpu_temp: number | null; unit: string };
  system?: { uptime: number };
}

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

function domainRegex(domain: string): string {
  const escaped = domain.replace(/\./g, '\\.');
  return `(^|\\.)(${escaped})$`;
}

function normalizeBaseUrl(baseUrl: string): string {
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new TypeError('baseUrl must be a non-empty string');
  }

  const url = new URL(baseUrl);
  url.pathname = url.pathname.replace(/\/$/, '');
  return url.toString().replace(/\/$/, '');
}

function extractErrorMessage(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    const nested = record.error as Record<string, unknown> | undefined;
    const message = nested?.message ?? record.message;
    if (typeof message === 'string' && message) return message;
  }
  return `HTTP ${status}`;
}

export class PiHoleClient {
  readonly #baseUrl: string;
  readonly #password: string;
  readonly #timeoutMs: number;
  readonly #fetch: typeof globalThis.fetch;
  readonly #sessionStore: SessionStore;

  constructor({ baseUrl, password = '', timeoutMs = 10_000, fetch: fetchImpl, sessionStore }: PiHoleClientOptions) {
    if (typeof timeoutMs !== 'number' || !Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      throw new TypeError('timeoutMs must be a positive finite number');
    }
    this.#baseUrl = normalizeBaseUrl(baseUrl);
    this.#password = password;
    this.#timeoutMs = timeoutMs;
    this.#fetch = fetchImpl ?? globalThis.fetch;
    if (typeof this.#fetch !== 'function') {
      throw new TypeError('A fetch implementation must be available');
    }
    this.#sessionStore = sessionStore ?? new MemorySessionStore();
  }

  async #request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { noBody, sid, useSession = true, ...init } = options;

    if (useSession && !sid) {
      return this.#withSession((sessionSid) => this.#request<T>(path, { ...options, sid: sessionSid }));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.#timeoutMs);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((init.headers as Record<string, string> | undefined) ?? {}),
      };
      if (sid) headers.sid = sid;

      const response = await this.#fetch(`${this.#baseUrl}/api/${path}`, {
        ...init,
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new PiHoleError(extractErrorMessage(body, response.status), {
          status: response.status,
          response,
          body,
        });
      }

      if (noBody) return undefined as T;
      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new PiHoleError('Connection timed out', { status: 408, code: 'TIMEOUT' });
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async #authenticate(): Promise<{ sid: string; validity: number }> {
    if (!this.#password) {
      const data = await this.#request<AuthResponse>('auth', { useSession: false });
      if (data.session?.valid) {
        return { sid: data.session.sid ?? '', validity: data.session.validity };
      }
      throw new PiHoleError('Password required', { status: 401, code: 'PASSWORD_REQUIRED' });
    }

    const data = await this.#request<AuthResponse>('auth', {
      useSession: false,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: this.#password }),
    }).catch((error) => {
      if (error instanceof PiHoleError && error.status === 401) {
        throw new PiHoleError('Password incorrect', { status: 401, code: 'PASSWORD_INCORRECT' });
      }
      throw error;
    });

    return { sid: data.session!.sid!, validity: data.session!.validity };
  }

  async #getSession(): Promise<string> {
    const cached = await this.#sessionStore.get(this.#baseUrl);
    if (cached && (!cached.expiresAt || cached.expiresAt > Date.now())) {
      return cached.sid;
    }

    if (cached?.sid) {
      const data = await this.#request<AuthResponse>('auth', {
        useSession: false,
        sid: cached.sid,
      }).catch(() => null);
      if (data?.session?.valid) {
        await this.#sessionStore.set(this.#baseUrl, {
          sid: cached.sid,
          expiresAt: data.session.validity > 0 ? Date.now() + data.session.validity * 1000 : undefined,
        });
        return cached.sid;
      }
    }

    const session = await this.#authenticate();
    await this.#sessionStore.set(this.#baseUrl, {
      sid: session.sid,
      expiresAt: session.validity > 0 ? Date.now() + session.validity * 1000 : undefined,
    });
    return session.sid;
  }

  async #withSession<T>(fn: (sid: string) => Promise<T>): Promise<T> {
    const sid = await this.#getSession();
    try {
      return await fn(sid);
    } catch (error) {
      if (error instanceof PiHoleError && error.status === 401) {
        await this.#sessionStore.delete(this.#baseUrl);
        const session = await this.#authenticate();
        await this.#sessionStore.set(this.#baseUrl, {
          sid: session.sid,
          expiresAt: session.validity > 0 ? Date.now() + session.validity * 1000 : undefined,
        });
        return fn(session.sid);
      }
      throw error;
    }
  }

  async getSummary(): Promise<PiholeSummary> {
    const [stats, blocking, historyRes, groupsRes, listsRes, paddRes] = await Promise.all([
      this.#request<SummaryStatsResponse>('stats/summary'),
      this.#request<BlockingStatus>('dns/blocking'),
      this.#request<HistoryResponse>('history').catch(() => ({ history: [] })),
      this.#request<GroupsResponse>('groups').catch(() => ({ groups: [] })),
      this.#request<ListsResponse>('lists').catch(() => ({ lists: [] })),
      this.#request<PaddResponse>('padd').catch(() => null),
    ]);

    const diagnosis: PiholeDiagnosis | null = paddRes
      ? {
          cpu: paddRes['%cpu'] ?? 0,
          memory: paddRes['%mem'] ?? 0,
          temperature: paddRes.sensors?.cpu_temp ?? null,
          tempUnit: paddRes.sensors?.unit ?? 'C',
          uptime: paddRes.system?.uptime ?? 0,
        }
      : null;

    return {
      queries: stats.queries,
      clients: stats.clients,
      blocking,
      history: historyRes.history,
      groups: groupsRes.groups,
      lists: listsRes.lists,
      diagnosis,
    };
  }

  async searchDomain(domain: string): Promise<DomainSearchResult> {
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('domain must be a non-empty string');
    }
    const res = await this.#request<{ search: DomainSearchResult }>(`search/${encodeURIComponent(domain)}?partial=false`);
    return res.search;
  }

  async blockDomain(domain: string): Promise<void> {
    await this.#request<void>('domains/deny/regex', {
      method: 'POST',
      body: JSON.stringify({
        domain: domainRegex(domain),
        comment: '',
        groups: [0],
        enabled: true,
      }),
    });
  }

  async allowlistDomain(domain: string): Promise<void> {
    await this.#request<void>('domains/allow/regex', {
      method: 'POST',
      body: JSON.stringify({
        domain: domainRegex(domain),
        comment: '',
        groups: [0],
        enabled: true,
      }),
    });
  }

  async deleteDomainEntry(type: 'allow' | 'deny', kind: 'exact' | 'regex', domain: string): Promise<void> {
    await this.#request<void>(`domains/${type}/${kind}/${encodeURIComponent(domain)}`, {
      method: 'DELETE',
      noBody: true,
    });
  }

  async setGroupEnabled(group: PiholeGroup, enabled: boolean): Promise<void> {
    await this.#request<void>(`groups/${encodeURIComponent(group.name)}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: group.name,
        comment: group.comment,
        enabled,
      }),
    });
  }

  async setListEnabled(list: PiholeList, enabled: boolean): Promise<void> {
    await this.#request<void>(`lists/${encodeURIComponent(list.address)}?type=${list.type}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment: list.comment,
        type: list.type,
        groups: list.groups,
        enabled,
      }),
    });
  }

  async setBlocking(enabled: boolean, seconds?: number): Promise<BlockingStatus> {
    return this.#request<BlockingStatus>('dns/blocking', {
      method: 'POST',
      body: JSON.stringify({
        blocking: enabled,
        timer: seconds ? seconds : null,
      }),
    });
  }
}
