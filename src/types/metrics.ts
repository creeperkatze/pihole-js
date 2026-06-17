import type { ApiResponseBase, JsonValue } from './base.js';

/** A single data point in the query history time series. */
export interface HistoryPoint {
  timestamp: number;
  total: number;
  cached: number;
  blocked: number;
  forwarded: number;
}

/** Current stats snapshot including query counts and client activity. */
export interface SummaryStatsResponse extends ApiResponseBase {
  queries: {
    total: number;
    blocked: number;
    percent_blocked: number;
    unique_domains: number;
    cached: number;
    forwarded: number;
    types: Record<string, number>;
    frequency?: number;
    status?: Record<string, number>;
    replies?: Record<string, number>;
  };
  clients: {
    active: number;
    total: number;
  };
  gravity?: {
    domains_being_blocked?: number;
    last_update?: number;
  };
}

/** Aggregated stats from the long-term query database for a time range. */
export interface DatabaseSummaryResponse extends ApiResponseBase {
  sum_queries: number;
  sum_blocked: number;
  percent_blocked: number;
  total_clients: number;
}

/** Usage stats for a single upstream DNS resolver. */
export interface UpstreamMetric {
  ip: string | null;
  name: string | null;
  port: number;
  count: number;
  statistics?: {
    response?: number;
    variance?: number;
  };
}

/** Stats for all upstream resolvers. */
export interface UpstreamsResponse extends ApiResponseBase {
  upstreams: UpstreamMetric[];
  forwarded_queries: number;
  total_queries: number;
}

/** A domain paired with its query count. */
export interface CountedDomain {
  domain: string;
  count: number;
}

/** Top queried or blocked domains. */
export interface TopDomainsResponse extends ApiResponseBase {
  domains: CountedDomain[];
  total_queries: number;
  blocked_queries: number;
}

/** A client paired with its query count. */
export interface CountedClient {
  ip: string;
  name: string | null;
  count: number;
}

/** Top clients by query volume. */
export interface TopClientsResponse extends ApiResponseBase {
  clients: CountedClient[];
  total_queries: number;
  blocked_queries: number;
}

/** Query count breakdown by DNS record type. */
export interface QueryTypesResponse extends ApiResponseBase {
  types: Record<string, number>;
}

/** List of recently blocked domains. */
export interface RecentBlockedResponse extends ApiResponseBase {
  blocked: string[];
}

/** Time series of query counts. */
export interface HistoryResponse extends ApiResponseBase {
  history: HistoryPoint[];
}

/** Summary info for a client within a history response. */
export interface ClientHistorySummary {
  name: string | null;
  total: number;
}

/** Per-client query counts for a single time bucket. */
export interface ClientHistoryBucket {
  timestamp: number;
  data: Record<string, number>;
}

/** Per-client query history over time. */
export interface ClientHistoryResponse extends ApiResponseBase {
  clients: Record<string, ClientHistorySummary>;
  history: ClientHistoryBucket[];
}

/** DNS reply type and response time for a query. */
export interface QueryReply {
  type: string | null;
  time: number;
}

/** IP and hostname of a DNS client. */
export interface QueryClient {
  ip: string;
  name: string | null;
}

/** Extended DNS Error attached to a query. */
export interface QueryEde {
  code: number;
  text: string | null;
}

/** A single entry from the DNS query log. */
export interface QueryLogEntry {
  id: number;
  time: number;
  type: string;
  domain: string;
  cname: string | null;
  status: string | null;
  client: QueryClient;
  dnssec: string | null;
  reply: QueryReply;
  list_id: number | null;
  upstream: string | null;
  ede?: QueryEde;
}

/** Paginated DNS query log. */
export interface QueriesResponse extends ApiResponseBase {
  queries: QueryLogEntry[];
  cursor: number;
  recordsTotal: number;
  recordsFiltered: number;
  draw?: number;
  earliest_timestamp?: number;
  earliest_timestamp_disk?: number;
}

/** Autocomplete suggestions for query log filters. */
export interface QuerySuggestionsResponse extends ApiResponseBase {
  suggestions: Record<string, string[]>;
}

/** Summary metrics for the PADD dashboard. */
export interface PaddResponse extends ApiResponseBase {
  '%cpu'?: number;
  '%mem'?: number;
  sensors?: {
    cpu_temp: number | null;
    unit: string;
  };
  system?: {
    uptime: number;
  };
  [key: string]: JsonValue | undefined;
}
