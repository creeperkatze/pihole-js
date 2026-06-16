import { MetricsClient } from './metrics.js';
import type {
  ClientMutationPayload,
  ClientReplacePayload,
  ClientSuggestionsResponse,
  ClientsResponse,
  DomainKind,
  DomainLookupOptions,
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
  PiHoleClientOptions,
} from '../types/index.js';
import { domainsPath, encodeSegment } from '../utils/domain.js';

export class ManagementClient extends MetricsClient {
  constructor(options: PiHoleClientOptions) {
    super(options);
  }

  async getDomains(options?: DomainLookupOptions): Promise<DomainsResponse> {
    return this.requestJson<DomainsResponse>(domainsPath(options));
  }

  async createDomain(type: DomainType, kind: DomainKind, payload: DomainMutationPayload): Promise<DomainsResponse> {
    return this.requestJson<DomainsResponse>(`domains/${type}/${kind}`, {
      method: 'POST',
      body: payload,
    });
  }

  async replaceDomain(type: DomainType, kind: DomainKind, domain: string, payload: DomainReplacePayload): Promise<DomainsResponse> {
    return this.requestJson<DomainsResponse>(`domains/${type}/${kind}/${encodeSegment(domain)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async deleteDomain(type: DomainType, kind: DomainKind, domain: string): Promise<void> {
    await this.requestVoid(`domains/${type}/${kind}/${encodeSegment(domain)}`, { method: 'DELETE' });
  }

  async deleteDomains(items: Array<{ item: string; type: DomainType; kind: DomainKind }>): Promise<void> {
    await this.requestVoid('domains:batchDelete', {
      method: 'POST',
      body: items,
    });
  }

  async getGroups(name?: string): Promise<GroupsResponse> {
    return this.requestJson<GroupsResponse>(name ? `groups/${encodeSegment(name)}` : 'groups');
  }

  async createGroup(payload: GroupMutationPayload): Promise<GroupsResponse> {
    return this.requestJson<GroupsResponse>('groups', {
      method: 'POST',
      body: payload,
    });
  }

  async replaceGroup(name: string, payload: GroupReplacePayload): Promise<GroupsResponse> {
    return this.requestJson<GroupsResponse>(`groups/${encodeSegment(name)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async deleteGroup(name: string): Promise<void> {
    await this.requestVoid(`groups/${encodeSegment(name)}`, { method: 'DELETE' });
  }

  async deleteGroups(items: Array<{ item: string }>): Promise<void> {
    await this.requestVoid('groups:batchDelete', {
      method: 'POST',
      body: items,
    });
  }

  async getClients(client?: string): Promise<ClientsResponse> {
    return this.requestJson<ClientsResponse>(client ? `clients/${encodeSegment(client)}` : 'clients');
  }

  async createClient(payload: ClientMutationPayload): Promise<ClientsResponse> {
    return this.requestJson<ClientsResponse>('clients', {
      method: 'POST',
      body: payload,
    });
  }

  async replaceClient(client: string, payload: ClientReplacePayload): Promise<ClientsResponse> {
    return this.requestJson<ClientsResponse>(`clients/${encodeSegment(client)}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async deleteClient(client: string): Promise<void> {
    await this.requestVoid(`clients/${encodeSegment(client)}`, { method: 'DELETE' });
  }

  async deleteClients(items: Array<{ item: string }>): Promise<void> {
    await this.requestVoid('clients:batchDelete', {
      method: 'POST',
      body: items,
    });
  }

  async getClientSuggestions(): Promise<ClientSuggestionsResponse> {
    return this.requestJson<ClientSuggestionsResponse>('clients/_suggestions');
  }

  async getLists(address?: string, options?: ListLookupOptions): Promise<ListsResponse> {
    const path = address ? `lists/${encodeSegment(address)}` : 'lists';
    return this.requestJson<ListsResponse>(path, { query: options });
  }

  async createList(type: ListType, payload: ListMutationPayload): Promise<ListsResponse> {
    return this.requestJson<ListsResponse>('lists', {
      method: 'POST',
      query: { type },
      body: payload,
    });
  }

  async replaceList(address: string, payload: ListReplacePayload): Promise<ListsResponse> {
    return this.requestJson<ListsResponse>(`lists/${encodeSegment(address)}`, {
      method: 'PUT',
      query: { type: payload.type },
      body: payload,
    });
  }

  async deleteList(address: string, type: ListType): Promise<void> {
    await this.requestVoid(`lists/${encodeSegment(address)}`, {
      method: 'DELETE',
      query: { type },
    });
  }

  async deleteLists(items: Array<{ item: string; type: ListType }>): Promise<void> {
    await this.requestVoid('lists:batchDelete', {
      method: 'POST',
      body: items,
    });
  }
}
