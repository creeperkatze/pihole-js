import { PiHoleClientCore } from './core.js';
import type {
  GroupMutationPayload,
  GroupUpdatePayload,
  GroupsResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

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
