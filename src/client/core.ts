import { PiHoleError } from '../errors.js';
import { MemorySessionStore } from '../session/index.js';
import {
  buildApiUrl,
  extractErrorMessage,
  isPlainObject,
  normalizeBaseUrl,
  parseErrorBody,
  withJsonBody,
} from '../utils/request.js';
import type { AuthRequest, AuthResponse, PiHoleClientOptions, SessionStore } from '../types/index.js';

type ResponseKind = 'json' | 'text' | 'arrayBuffer' | 'void';

interface InternalRequestOptions extends Omit<RequestInit, 'body'> {
  auth?: 'session' | 'none';
  body?: BodyInit | object | object[] | null;
  parseAs?: ResponseKind;
  query?: object;
  sid?: string | null;
}

interface SessionAuthResult {
  sid: string | null;
  validity: number;
}

export abstract class PiHoleClientCore {
  readonly #baseUrl: string;
  readonly #password: string;
  readonly #timeoutMs: number;
  readonly #userAgent: string | null;
  readonly #fetch: typeof globalThis.fetch;
  readonly #sessionStore: SessionStore;

  protected constructor({ baseUrl, password = '', timeoutMs = 10_000, userAgent, fetch: fetchImpl, sessionStore }: PiHoleClientOptions) {
    if (typeof timeoutMs !== 'number' || !Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      throw new TypeError('timeoutMs must be a positive finite number');
    }
    if (userAgent != null && typeof userAgent !== 'string') {
      throw new TypeError('userAgent must be a string');
    }

    this.#baseUrl = normalizeBaseUrl(baseUrl);
    this.#password = password;
    this.#timeoutMs = timeoutMs;
    this.#userAgent = userAgent ?? null;
    this.#fetch = fetchImpl ?? globalThis.fetch;
    this.#sessionStore = sessionStore ?? new MemorySessionStore();

    if (typeof this.#fetch !== 'function') {
      throw new TypeError('A fetch implementation must be available');
    }
  }

  protected async requestJson<T>(path: string, options: InternalRequestOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, parseAs: 'json' });
  }

  protected async requestText(path: string, options: InternalRequestOptions = {}): Promise<string> {
    return this.request<string>(path, { ...options, parseAs: 'text' });
  }

  protected async requestArrayBuffer(path: string, options: InternalRequestOptions = {}): Promise<ArrayBuffer> {
    return this.request<ArrayBuffer>(path, { ...options, parseAs: 'arrayBuffer' });
  }

  protected async requestVoid(path: string, options: InternalRequestOptions = {}): Promise<void> {
    await this.request(path, { ...options, parseAs: 'void' });
  }

  protected async loginWithCredentials(credentials: AuthRequest): Promise<AuthResponse> {
    return this.requestJson<AuthResponse>('auth', {
      auth: 'none',
      method: 'POST',
      body: credentials,
    });
  }

  protected async logoutSession(): Promise<void> {
    await this.requestVoid('auth', { method: 'DELETE' });
    await this.#sessionStore.delete(this.#baseUrl);
  }

  async withSession<T>(fn: (sid: string | null) => Promise<T>): Promise<T> {
    const sid = await this.#getSession();

    try {
      return await fn(sid);
    } catch (error) {
      if (error instanceof PiHoleError && error.status === 401 && sid) {
        await this.#sessionStore.delete(this.#baseUrl);
        const session = await this.#authenticate();

        if (session.sid) {
          await this.#sessionStore.set(this.#baseUrl, {
            sid: session.sid,
            expiresAt: session.validity > 0 ? Date.now() + session.validity * 1000 : undefined,
          });
        }

        return fn(session.sid);
      }

      throw error;
    }
  }

  private async request<T>(path: string, options: InternalRequestOptions = {}): Promise<T> {
    const { auth = 'session', sid, parseAs = 'json', query, signal, ...init } = options;

    if (auth === 'session' && sid === undefined) {
      return this.withSession((resolvedSid) => this.request<T>(path, { ...options, sid: resolvedSid }));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.#timeoutMs);
    const headers = new Headers(init.headers);

    if (this.#userAgent) {
      headers.set('User-Agent', this.#userAgent);
    }

    if (sid) {
      headers.set('sid', sid);
    }

    try {
      const response = await this.#fetch(buildApiUrl(this.#baseUrl, path, query), {
        ...withJsonBody({ ...init, headers }),
        signal: signal ?? controller.signal,
      });

      if (!response.ok) {
        const body = await parseErrorBody(response);
        throw new PiHoleError(extractErrorMessage(body, response.status), {
          status: response.status,
          response,
          body,
          code: isPlainObject(body) ? (body.error as { key?: string } | undefined)?.key : undefined,
        });
      }

      if (parseAs === 'void') return undefined as T;
      if (parseAs === 'text') return (await response.text()) as T;
      if (parseAs === 'arrayBuffer') return (await response.arrayBuffer()) as T;
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

  async #authenticate(): Promise<SessionAuthResult> {
    if (!this.#password) {
      const data = await this.requestJson<AuthResponse>('auth', { auth: 'none' });
      if (data.session?.valid) {
        return { sid: data.session.sid, validity: data.session.validity };
      }
      throw new PiHoleError('Password required', { status: 401, code: 'PASSWORD_REQUIRED' });
    }

    const data = await this.loginWithCredentials({ password: this.#password }).catch((error) => {
      if (error instanceof PiHoleError && error.status === 401) {
        throw new PiHoleError('Password incorrect', { status: 401, code: 'PASSWORD_INCORRECT' });
      }
      throw error;
    });

    if (!data.session?.valid) {
      throw new PiHoleError(data.session?.message ?? 'Authentication failed', { status: 401, code: 'AUTH_FAILED' });
    }

    return { sid: data.session.sid, validity: data.session.validity };
  }

  async #getSession(): Promise<string | null> {
    const cached = await this.#sessionStore.get(this.#baseUrl);
    if (cached && (!cached.expiresAt || cached.expiresAt > Date.now())) {
      return cached.sid;
    }

    if (cached?.sid) {
      const data = await this.requestJson<AuthResponse>('auth', {
        auth: 'none',
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
    if (!session.sid) {
      await this.#sessionStore.delete(this.#baseUrl);
      return null;
    }

    await this.#sessionStore.set(this.#baseUrl, {
      sid: session.sid,
      expiresAt: session.validity > 0 ? Date.now() + session.validity * 1000 : undefined,
    });
    return session.sid;
  }
}
