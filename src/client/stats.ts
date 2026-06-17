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

/** Returns DNS statistics and traffic summaries. */
export class StatsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns a current snapshot of query and client stats. */
  async getSummary(): Promise<SummaryStatsResponse> {
    return this.core.requestJson<SummaryStatsResponse>('stats/summary');
  }

  /** Returns aggregated stats from the long-term database for a time range. */
  async getDatabaseSummary(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<DatabaseSummaryResponse> {
    return this.core.requestJson<DatabaseSummaryResponse>('stats/database/summary', { query: options });
  }

  /** Returns stats for all upstream DNS resolvers. */
  async getUpstreams(): Promise<UpstreamsResponse> {
    return this.core.requestJson<UpstreamsResponse>('stats/upstreams');
  }

  /** Returns upstream resolver stats from the long-term database for a time range. */
  async getDatabaseUpstreams(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<UpstreamsResponse> {
    return this.core.requestJson<UpstreamsResponse>('stats/database/upstreams', { query: options });
  }

  /** Returns the top queried or blocked domains. */
  async getTopDomains(options?: TopItemsOptions): Promise<TopDomainsResponse> {
    return this.core.requestJson<TopDomainsResponse>('stats/top_domains', { query: options });
  }

  /** Returns top domains from the long-term database for a time range. */
  async getDatabaseTopDomains(options: DatabaseQueryOptions): Promise<TopDomainsResponse> {
    return this.core.requestJson<TopDomainsResponse>('stats/database/top_domains', { query: options });
  }

  /** Returns the top clients by query volume. */
  async getTopClients(options?: TopItemsOptions): Promise<TopClientsResponse> {
    return this.core.requestJson<TopClientsResponse>('stats/top_clients', { query: options });
  }

  /** Returns top clients from the long-term database for a time range. */
  async getDatabaseTopClients(options: DatabaseQueryOptions): Promise<TopClientsResponse> {
    return this.core.requestJson<TopClientsResponse>('stats/database/top_clients', { query: options });
  }

  /** Returns query count broken down by DNS record type. */
  async getQueryTypes(): Promise<QueryTypesResponse> {
    return this.core.requestJson<QueryTypesResponse>('stats/query_types');
  }

  /** Returns query type breakdown from the long-term database for a time range. */
  async getDatabaseQueryTypes(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<QueryTypesResponse> {
    return this.core.requestJson<QueryTypesResponse>('stats/database/query_types', { query: options });
  }

  /** Returns the most recently blocked domains. */
  async getRecentBlocked(count?: number): Promise<RecentBlockedResponse> {
    return this.core.requestJson<RecentBlockedResponse>('stats/recent_blocked', { query: { count } });
  }
}
