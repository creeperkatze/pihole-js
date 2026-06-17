import { PiHoleClientCore } from './core.js';
import type {
  DatabaseQueryOptions,
  DatabaseSummaryResponse,
  QueryTypesResponse,
  RecentBlockedResponse,
  SummaryStatsResponse,
  TopItemsOptions,
  TopClientsResponse,
  TopDomainsResponse,
  UpstreamsResponse,
} from '../types/index.js';

export class StatsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getSummary(): Promise<SummaryStatsResponse> {
    return this.core.requestJson<SummaryStatsResponse>('stats/summary');
  }

  async getDatabaseSummary(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<DatabaseSummaryResponse> {
    return this.core.requestJson<DatabaseSummaryResponse>('stats/database/summary', { query: options });
  }

  async getUpstreams(): Promise<UpstreamsResponse> {
    return this.core.requestJson<UpstreamsResponse>('stats/upstreams');
  }

  async getDatabaseUpstreams(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<UpstreamsResponse> {
    return this.core.requestJson<UpstreamsResponse>('stats/database/upstreams', { query: options });
  }

  async getTopDomains(options?: TopItemsOptions): Promise<TopDomainsResponse> {
    return this.core.requestJson<TopDomainsResponse>('stats/top_domains', { query: options });
  }

  async getDatabaseTopDomains(options: DatabaseQueryOptions): Promise<TopDomainsResponse> {
    return this.core.requestJson<TopDomainsResponse>('stats/database/top_domains', { query: options });
  }

  async getTopClients(options?: TopItemsOptions): Promise<TopClientsResponse> {
    return this.core.requestJson<TopClientsResponse>('stats/top_clients', { query: options });
  }

  async getDatabaseTopClients(options: DatabaseQueryOptions): Promise<TopClientsResponse> {
    return this.core.requestJson<TopClientsResponse>('stats/database/top_clients', { query: options });
  }

  async getQueryTypes(): Promise<QueryTypesResponse> {
    return this.core.requestJson<QueryTypesResponse>('stats/query_types');
  }

  async getDatabaseQueryTypes(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<QueryTypesResponse> {
    return this.core.requestJson<QueryTypesResponse>('stats/database/query_types', { query: options });
  }

  async getRecentBlocked(count?: number): Promise<RecentBlockedResponse> {
    return this.core.requestJson<RecentBlockedResponse>('stats/recent_blocked', { query: { count } });
  }
}
