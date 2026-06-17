import { PiHoleClientCore } from './core.js';
import type {
  ClientMutationPayload,
  ClientUpdatePayload,
  ClientSuggestionsResponse,
  ClientsResponse,
  DomainKind,
  DomainMutationPayload,
  DomainUpdatePayload,
  DomainType,
  DomainsResponse,
  GroupMutationPayload,
  GroupUpdatePayload,
  GroupsResponse,
  ListLookupOptions,
  ListMutationPayload,
  ListUpdatePayload,
  ListsResponse,
  ListType,
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

export class GroupsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async list(): Promise<GroupsResponse> {
    return this.core.requestJson<GroupsResponse>('groups');
  }

  async get(name: string): Promise<GroupsResponse> {
    return this.core.requestJson<GroupsResponse>(`groups/${encodeSegment(name)}`);
  }

  async create(payload: GroupMutationPayload): Promise<GroupsResponse> {
    return this.core.requestJson<GroupsResponse>('groups', {
      method: 'POST',
      body: payload,
    });
  }

  async update(name: string, payload: GroupUpdatePayload): Promise<GroupsResponse> {
    return this.core.requestJson<GroupsResponse>(`groups/${encodeSegment(name)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(name: string): Promise<void> {
    await this.core.requestVoid(`groups/${encodeSegment(name)}`, { method: 'DELETE' });
  }

  async batchDelete(items: Array<{ item: string }>): Promise<void> {
    await this.core.requestVoid('groups:batchDelete', {
      method: 'POST',
      body: items,
    });
  }
}

export class ClientsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async list(): Promise<ClientsResponse> {
    return this.core.requestJson<ClientsResponse>('clients');
  }

  async get(client: string): Promise<ClientsResponse> {
    return this.core.requestJson<ClientsResponse>(`clients/${encodeSegment(client)}`);
  }

  async create(payload: ClientMutationPayload): Promise<ClientsResponse> {
    return this.core.requestJson<ClientsResponse>('clients', {
      method: 'POST',
      body: payload,
    });
  }

  async update(client: string, payload: ClientUpdatePayload): Promise<ClientsResponse> {
    return this.core.requestJson<ClientsResponse>(`clients/${encodeSegment(client)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(client: string): Promise<void> {
    await this.core.requestVoid(`clients/${encodeSegment(client)}`, { method: 'DELETE' });
  }

  async batchDelete(items: Array<{ item: string }>): Promise<void> {
    await this.core.requestVoid('clients:batchDelete', {
      method: 'POST',
      body: items,
    });
  }

  async getSuggestions(): Promise<ClientSuggestionsResponse> {
    return this.core.requestJson<ClientSuggestionsResponse>('clients/_suggestions');
  }
}

export class ListsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async list(options?: ListLookupOptions): Promise<ListsResponse> {
    return this.core.requestJson<ListsResponse>('lists', { query: options });
  }

  async get(address: string, options?: ListLookupOptions): Promise<ListsResponse> {
    return this.core.requestJson<ListsResponse>(`lists/${encodeSegment(address)}`, { query: options });
  }

  async create(type: ListType, payload: ListMutationPayload): Promise<ListsResponse> {
    return this.core.requestJson<ListsResponse>('lists', {
      method: 'POST',
      query: { type },
      body: payload,
    });
  }

  async update(address: string, payload: ListUpdatePayload): Promise<ListsResponse> {
    return this.core.requestJson<ListsResponse>(`lists/${encodeSegment(address)}`, {
      method: 'PUT',
      query: { type: payload.type },
      body: payload,
    });
  }

  async delete(address: string, type: ListType): Promise<void> {
    await this.core.requestVoid(`lists/${encodeSegment(address)}`, {
      method: 'DELETE',
      query: { type },
    });
  }

  async batchDelete(items: Array<{ item: string; type: ListType }>): Promise<void> {
    await this.core.requestVoid('lists:batchDelete', {
      method: 'POST',
      body: items,
    });
  }
}
