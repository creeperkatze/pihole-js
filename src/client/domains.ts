import { PiHoleClientCore } from './core.js';
import type {
  DomainKind,
  DomainMutationPayload,
  DomainUpdatePayload,
  DomainType,
  DomainsResponse,
  SearchOptions,
  SearchResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

/** Manages allowlist and denylist entries, including exact matches and regex patterns. */
export class DomainsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns all domain entries across all types and kinds. */
  async list(): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>('domains');
  }

  /** Returns domain entries filtered by type (allow or deny). */
  async listByType(type: DomainType): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}`);
  }

  /** Returns domain entries filtered by both type and kind. */
  async listByKind(type: DomainType, kind: DomainKind): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}/${kind}`);
  }

  async get(type: DomainType, kind: DomainKind, domain: string): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}/${kind}/${encodeSegment(domain)}`);
  }

  async create(type: DomainType, kind: DomainKind, payload: DomainMutationPayload): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}/${kind}`, {
      method: 'POST',
      body: payload,
    });
  }

  async update(type: DomainType, kind: DomainKind, domain: string, payload: DomainUpdatePayload): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}/${kind}/${encodeSegment(domain)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(type: DomainType, kind: DomainKind, domain: string): Promise<void> {
    await this.core.requestVoid(`domains/${type}/${kind}/${encodeSegment(domain)}`, { method: 'DELETE' });
  }

  /** Deletes multiple domain entries in one request. */
  async batchDelete(items: Array<{ item: string; type: DomainType; kind: DomainKind }>): Promise<void> {
    await this.core.requestVoid('domains:batchDelete', {
      method: 'POST',
      body: items,
    });
  }

  /** Adds a domain to the exact allowlist. */
  async allow(domain: string, comment?: string): Promise<DomainsResponse> {
    return this.create('allow', 'exact', { domain, comment });
  }

  /** Removes a domain from the exact allowlist. */
  async unallow(domain: string): Promise<void> {
    return this.delete('allow', 'exact', domain);
  }

  /** Returns all exact allowlist entries. */
  async getAllowlist(): Promise<DomainsResponse> {
    return this.listByKind('allow', 'exact');
  }

  /** Adds a domain to the exact denylist. */
  async deny(domain: string, comment?: string): Promise<DomainsResponse> {
    return this.create('deny', 'exact', { domain, comment });
  }

  /** Removes a domain from the exact denylist. */
  async undeny(domain: string): Promise<void> {
    return this.delete('deny', 'exact', domain);
  }

  /** Returns all exact denylist entries. */
  async getDenylist(): Promise<DomainsResponse> {
    return this.listByKind('deny', 'exact');
  }

  /** Adds a regex pattern to the allow regex list. */
  async allowRegex(pattern: string, comment?: string): Promise<DomainsResponse> {
    return this.create('allow', 'regex', { domain: pattern, comment });
  }

  /** Removes a regex pattern from the allow regex list. */
  async unallowRegex(pattern: string): Promise<void> {
    return this.delete('allow', 'regex', pattern);
  }

  /** Adds a regex pattern to the deny regex list. */
  async denyRegex(pattern: string, comment?: string): Promise<DomainsResponse> {
    return this.create('deny', 'regex', { domain: pattern, comment });
  }

  /** Removes a regex pattern from the deny regex list. */
  async undenyRegex(pattern: string): Promise<void> {
    return this.delete('deny', 'regex', pattern);
  }

  /** Searches for a domain across all lists and gravity. */
  async search(domain: string, options?: SearchOptions): Promise<SearchResponse> {
    return this.core.requestJson<SearchResponse>(`search/${encodeSegment(domain)}`, { query: options });
  }
}
