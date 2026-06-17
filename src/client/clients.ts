import { PiHoleClientCore } from './core.js';
import type {
  ClientMutationPayload,
  ClientUpdatePayload,
  ClientSuggestionsResponse,
  ClientsResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

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
