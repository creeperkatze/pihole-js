import type { ListType } from './resources.js';

/** Time range and filter options for long-term database queries. */
export interface DatabaseQueryOptions {
  /** Start of the time range as a Unix timestamp. */
  from: number;
  /** End of the time range as a Unix timestamp. */
  until: number;
  blocked?: boolean;
  count?: number;
}

/** Options for top-domain and top-client stats requests. */
export interface TopItemsOptions {
  blocked?: boolean;
  count?: number;
}

/** Filtering and pagination options for query log lookups. */
export interface QueryListOptions {
  from?: number;
  until?: number;
  length?: number;
  start?: number;
  cursor?: number;
  domain?: string;
  client_ip?: string;
  client_name?: string;
  upstream?: string;
  type?: string;
  status?: string;
  reply?: string;
  dnssec?: string;
  disk?: boolean;
}

/** Options for domain search requests. */
export interface SearchOptions {
  /** Whether to include partial matches. */
  partial?: boolean;
  N?: number;
  debug?: boolean;
}

/** Filter option for list queries. */
export interface ListLookupOptions {
  type?: ListType;
}

/** Options for config read requests. */
export interface ConfigQueryOptions {
  detailed?: boolean;
}

/** Options for config write requests. */
export interface ConfigMutationOptions {
  /** Restart the DNS resolver after applying changes. */
  restart?: boolean;
}

/** Options for the client history endpoint. */
export interface HistoryClientsOptions {
  N?: number;
}

/** Pagination options for the network devices endpoint. */
export interface NetworkDevicesOptions {
  max_devices?: number;
  max_addresses?: number;
}

/** Controls verbose output for network info endpoints. */
export interface DetailedNetworkOptions {
  detailed?: boolean;
}

/** Options for the gravity update action. */
export interface GravityOptions {
  color?: boolean;
}

/** Cursor options for log streaming. */
export interface LogsOptions {
  /** ID of the first log entry to return, used for incremental polling. */
  nextID?: number;
}
