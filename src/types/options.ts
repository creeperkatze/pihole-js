import type { DomainKind, DomainType, ListType } from './resources.js';

export interface DatabaseQueryOptions {
  from: number;
  until: number;
  blocked?: boolean;
  count?: number;
}

export interface TopItemsOptions {
  blocked?: boolean;
  count?: number;
}

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

export interface SearchOptions {
  partial?: boolean;
  N?: number;
  debug?: boolean;
}

export interface ListLookupOptions {
  type?: ListType;
}

export interface ConfigQueryOptions {
  detailed?: boolean;
}

export interface ConfigMutationOptions {
  restart?: boolean;
}

export interface HistoryClientsOptions {
  N?: number;
}

export interface NetworkDevicesOptions {
  max_devices?: number;
  max_addresses?: number;
}

export interface DetailedNetworkOptions {
  detailed?: boolean;
}

export interface DomainLookupOptions {
  path?: string;
  type?: DomainType;
  kind?: DomainKind;
  domain?: string;
}

export interface GravityOptions {
  color?: boolean;
}

export interface LogsOptions {
  nextID?: number;
}
