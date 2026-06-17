import { PiHoleClientCore } from './core.js';
import type {
  ConfigMutationOptions,
  ConfigQueryOptions,
  ConfigResponse,
  GenericApiResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

/** Reads and writes Pi-hole configuration. */
export class ConfigApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns the full configuration. */
  async get(options?: ConfigQueryOptions): Promise<ConfigResponse> {
    return this.core.requestJson<ConfigResponse>('config', { query: options });
  }

  /** Applies a partial update to the configuration. */
  async patch(config: ConfigResponse['config'], options?: ConfigMutationOptions): Promise<ConfigResponse> {
    return this.core.requestJson<ConfigResponse>('config', {
      method: 'PATCH',
      query: options,
      body: { config },
    });
  }

  /** Returns a specific configuration section by its dot-path element key. */
  async getSection(element: string, options?: ConfigQueryOptions): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>(`config/${element.replace(/^\/+/, '')}`, { query: options });
  }

  /** Appends a value to an array-type configuration entry. */
  async addArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.core.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'PUT',
      query: options,
    });
  }

  /** Removes a value from an array-type configuration entry. */
  async removeArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.core.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'DELETE',
      query: options,
    });
  }
}
