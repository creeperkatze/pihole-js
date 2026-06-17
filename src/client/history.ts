import { PiHoleClientCore } from './core.js';
import type {
  ClientHistoryResponse,
  DatabaseQueryOptions,
  HistoryClientsOptions,
  HistoryResponse,
} from '../types/index.js';

export class HistoryApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async get(): Promise<HistoryResponse> {
    return this.core.requestJson<HistoryResponse>('history');
  }

  async getClients(options?: HistoryClientsOptions): Promise<ClientHistoryResponse> {
    return this.core.requestJson<ClientHistoryResponse>('history/clients', { query: options });
  }

  async getDatabase(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<HistoryResponse> {
    return this.core.requestJson<HistoryResponse>('history/database', { query: options });
  }

  async getDatabaseClients(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<ClientHistoryResponse> {
    return this.core.requestJson<ClientHistoryResponse>('history/database/clients', { query: options });
  }
}
