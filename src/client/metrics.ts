import { AuthClient } from './auth.js';
import type {
  BlockingStatus,
  ClientHistoryResponse,
  DatabaseQueryOptions,
  DatabaseSummaryResponse,
  HistoryClientsOptions,
  HistoryResponse,
  PiHoleClientOptions,
  QueriesResponse,
  QueryListOptions,
  QuerySuggestionsResponse,
  QueryTypesResponse,
  RecentBlockedResponse,
  SummaryStatsResponse,
  TopClientsResponse,
  TopDomainsResponse,
  UpstreamsResponse,
} from '../types/index.js';

export class MetricsClient extends AuthClient {
  constructor(options: PiHoleClientOptions) {
    super(options);
  }

  async getStatsSummary(): Promise<SummaryStatsResponse> {
    return this.requestJson<SummaryStatsResponse>('stats/summary');
  }

  async getStatsDatabaseSummary(options: DatabaseQueryOptions): Promise<DatabaseSummaryResponse> {
    return this.requestJson<DatabaseSummaryResponse>('stats/database/summary', { query: options });
  }

  async getStatsUpstreams(): Promise<UpstreamsResponse> {
    return this.requestJson<UpstreamsResponse>('stats/upstreams');
  }

  async getStatsDatabaseUpstreams(options: DatabaseQueryOptions): Promise<UpstreamsResponse> {
    return this.requestJson<UpstreamsResponse>('stats/database/upstreams', { query: options });
  }

  async getStatsTopDomains(options?: DatabaseQueryOptions): Promise<TopDomainsResponse> {
    const path = options?.from != null && options.until != null ? 'stats/database/top_domains' : 'stats/top_domains';
    return this.requestJson<TopDomainsResponse>(path, { query: options });
  }

  async getStatsTopClients(options?: DatabaseQueryOptions): Promise<TopClientsResponse> {
    const path = options?.from != null && options.until != null ? 'stats/database/top_clients' : 'stats/top_clients';
    return this.requestJson<TopClientsResponse>(path, { query: options });
  }

  async getStatsQueryTypes(options?: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<QueryTypesResponse> {
    const path = options?.from != null && options.until != null ? 'stats/database/query_types' : 'stats/query_types';
    return this.requestJson<QueryTypesResponse>(path, { query: options });
  }

  async getStatsRecentBlocked(count?: number): Promise<RecentBlockedResponse> {
    return this.requestJson<RecentBlockedResponse>('stats/recent_blocked', { query: { count } });
  }

  async getHistory(): Promise<HistoryResponse> {
    return this.requestJson<HistoryResponse>('history');
  }

  async getHistoryClients(options?: HistoryClientsOptions): Promise<ClientHistoryResponse> {
    return this.requestJson<ClientHistoryResponse>('history/clients', { query: options });
  }

  async getHistoryDatabase(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<HistoryResponse> {
    return this.requestJson<HistoryResponse>('history/database', { query: options });
  }

  async getHistoryDatabaseClients(options: Pick<DatabaseQueryOptions, 'from' | 'until'>): Promise<ClientHistoryResponse> {
    return this.requestJson<ClientHistoryResponse>('history/database/clients', { query: options });
  }

  async getQueries(options?: QueryListOptions): Promise<QueriesResponse> {
    return this.requestJson<QueriesResponse>('queries', { query: options });
  }

  async getQuerySuggestions(): Promise<QuerySuggestionsResponse> {
    return this.requestJson<QuerySuggestionsResponse>('queries/suggestions');
  }

  async getBlocking(): Promise<BlockingStatus> {
    return this.requestJson<BlockingStatus>('dns/blocking');
  }

  async updateBlocking(blocking: boolean, timer?: number | null): Promise<BlockingStatus> {
    return this.requestJson<BlockingStatus>('dns/blocking', {
      method: 'POST',
      body: {
        blocking,
        timer: timer ?? null,
      },
    });
  }
}
