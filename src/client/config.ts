import { PiHoleClientCore } from './core.js';
import type {
  ConfigMutationOptions,
  ConfigQueryOptions,
  ConfigResponse,
  GenericApiResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class ConfigApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async get(options?: ConfigQueryOptions): Promise<ConfigResponse> {
    return this.core.requestJson<ConfigResponse>('config', { query: options });
  }

  async patch(config: ConfigResponse['config'], options?: ConfigMutationOptions): Promise<ConfigResponse> {
    return this.core.requestJson<ConfigResponse>('config', {
      method: 'PATCH',
      query: options,
      body: { config },
    });
  }

  async getSection(element: string, options?: ConfigQueryOptions): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>(`config/${element.replace(/^\/+/, '')}`, { query: options });
  }

  async addArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.core.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'PUT',
      query: options,
    });
  }

  async removeArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.core.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'DELETE',
      query: options,
    });
  }
}
