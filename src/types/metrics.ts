import type { ApiResponseBase, JsonValue } from './base.js';

export interface HistoryPoint {
  timestamp: number;
  total: number;
  cached: number;
  blocked: number;
  forwarded: number;
}

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

export interface DatabaseSummaryResponse extends ApiResponseBase {
  sum_queries: number;
  sum_blocked: number;
  percent_blocked: number;
  total_clients: number;
}

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

export interface UpstreamsResponse extends ApiResponseBase {
  upstreams: UpstreamMetric[];
  forwarded_queries: number;
  total_queries: number;
}

export interface CountedDomain {
  domain: string;
  count: number;
}

export interface TopDomainsResponse extends ApiResponseBase {
  domains: CountedDomain[];
  total_queries: number;
  blocked_queries: number;
}

export interface CountedClient {
  ip: string;
  name: string | null;
  count: number;
}

export interface TopClientsResponse extends ApiResponseBase {
  clients: CountedClient[];
  total_queries: number;
  blocked_queries: number;
}

export interface QueryTypesResponse extends ApiResponseBase {
  types: Record<string, number>;
}

export interface RecentBlockedResponse extends ApiResponseBase {
  blocked: string[];
}

export interface HistoryResponse extends ApiResponseBase {
  history: HistoryPoint[];
}

export interface ClientHistorySummary {
  name: string | null;
  total: number;
}

export interface ClientHistoryBucket {
  timestamp: number;
  data: Record<string, number>;
}

export interface ClientHistoryResponse extends ApiResponseBase {
  clients: Record<string, ClientHistorySummary>;
  history: ClientHistoryBucket[];
}

export interface QueryReply {
  type: string | null;
  time: number;
}

export interface QueryClient {
  ip: string;
  name: string | null;
}

export interface QueryEde {
  code: number;
  text: string | null;
}

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

export interface QueriesResponse extends ApiResponseBase {
  queries: QueryLogEntry[];
  cursor: number;
  recordsTotal: number;
  recordsFiltered: number;
  draw?: number;
  earliest_timestamp?: number;
  earliest_timestamp_disk?: number;
}

export interface QuerySuggestionsResponse extends ApiResponseBase {
  suggestions: Record<string, string[]>;
}

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
