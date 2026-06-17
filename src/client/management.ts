import { PiHoleClientCore } from './core.js';
import type {
  ClientMutationPayload,
  ClientReplacePayload,
  ClientSuggestionsResponse,
  ClientsResponse,
  DomainKind,
  DomainMutationPayload,
  DomainReplacePayload,
  DomainType,
  DomainsResponse,
  GroupMutationPayload,
  GroupReplacePayload,
  GroupsResponse,
  ListLookupOptions,
  ListMutationPayload,
  ListReplacePayload,
  ListsResponse,
  ListType,
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

  async replace(type: DomainType, kind: DomainKind, domain: string, payload: DomainReplacePayload): Promise<DomainsResponse> {
    return this.core.requestJson<DomainsResponse>(`domains/${type}/${kind}/${encodeSegment(domain)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(type: DomainType, kind: DomainKind, domain: string): Promise<void> {
    await this.core.requestVoid(`domains/${type}/${kind}/${encodeSegment(domain)}`, { method: 'DELETE' });
  }

  async deleteMany(items: Array<{ item: string; type: DomainType; kind: DomainKind }>): Promise<void> {
    await this.core.requestVoid('domains:batchDelete', {
      method: 'POST',
      body: items,
    });
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

  async replace(name: string, payload: GroupReplacePayload): Promise<GroupsResponse> {
    return this.core.requestJson<GroupsResponse>(`groups/${encodeSegment(name)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(name: string): Promise<void> {
    await this.core.requestVoid(`groups/${encodeSegment(name)}`, { method: 'DELETE' });
  }

  async deleteMany(items: Array<{ item: string }>): Promise<void> {
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

  async replace(client: string, payload: ClientReplacePayload): Promise<ClientsResponse> {
    return this.core.requestJson<ClientsResponse>(`clients/${encodeSegment(client)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(client: string): Promise<void> {
    await this.core.requestVoid(`clients/${encodeSegment(client)}`, { method: 'DELETE' });
  }

  async deleteMany(items: Array<{ item: string }>): Promise<void> {
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

  async replace(address: string, payload: ListReplacePayload): Promise<ListsResponse> {
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

  async deleteMany(items: Array<{ item: string; type: ListType }>): Promise<void> {
    await this.core.requestVoid('lists:batchDelete', {
      method: 'POST',
      body: items,
    });
  }
}
