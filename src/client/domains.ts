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

export class DomainsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async list(): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>('domains');
  }

  async listByType(type: DomainType): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}`);
  }

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

  async batchDelete(items: Array<{ item: string; type: DomainType; kind: DomainKind }>): Promise<void> {
    await this.core.requestVoid('domains:batchDelete', {
      method: 'POST',
      body: items,
    });
  }

  async allow(domain: string, comment?: string): Promise<DomainsResponse> {
    return this.create('allow', 'exact', { domain, comment });
  }

  async unallow(domain: string): Promise<void> {
    return this.delete('allow', 'exact', domain);
  }

  async getAllowlist(): Promise<DomainsResponse> {
    return this.listByKind('allow', 'exact');
  }

  async deny(domain: string, comment?: string): Promise<DomainsResponse> {
    return this.create('deny', 'exact', { domain, comment });
  }

  async undeny(domain: string): Promise<void> {
    return this.delete('deny', 'exact', domain);
  }

  async getDenylist(): Promise<DomainsResponse> {
    return this.listByKind('deny', 'exact');
  }

  async allowRegex(pattern: string, comment?: string): Promise<DomainsResponse> {
    return this.create('allow', 'regex', { domain: pattern, comment });
  }

  async denyRegex(pattern: string, comment?: string): Promise<DomainsResponse> {
    return this.create('deny', 'regex', { domain: pattern, comment });
  }

  async search(domain: string, options?: SearchOptions): Promise<SearchResponse> {
    return this.core.requestJson<SearchResponse>(`search/${encodeSegment(domain)}`, { query: options });
  }
}
