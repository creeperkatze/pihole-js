import { PiHoleClientCore } from './core.js';
import type {
  ClientHistoryResponse,
  DatabaseQueryOptions,
  HistoryClientsOptions,
  HistoryResponse,
} from '../types/index.js';

/** Retrieves query history as a time series. */
export class HistoryApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns recent query history from in-memory data. */
  async get(): Promise<HistoryResponse> {
    return this.core.requestJson<HistoryResponse>('history');
  }

  /** Returns per-client query history from in-memory data. */
  async getClients(options?: HistoryClientsOptions): Promise<ClientHistoryResponse> {
    return this.core.requestJson<ClientHistoryResponse>('history/clients', { query: options });
  }

  /** Returns query history from the long-term database for a time range. */
  async getDatabase(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<HistoryResponse> {
    return this.core.requestJson<HistoryResponse>('history/database', { query: options });
  }

  /** Returns per-client history from the long-term database for a time range. */
  async getDatabaseClients(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<ClientHistoryResponse> {
    return this.core.requestJson<ClientHistoryResponse>('history/database/clients', { query: options });
  }
}
