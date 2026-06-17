import { PiHoleClientCore } from './core.js';
import type {
  ListLookupOptions,
  ListMutationPayload,
  ListUpdatePayload,
  ListsResponse,
  ListType,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

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
