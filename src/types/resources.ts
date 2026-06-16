import type { ApiResponseBase, ProcessedResponse } from './base.js';

export type DomainType = 'allow' | 'deny';
export type DomainKind = 'exact' | 'regex';
export type ListType = 'allow' | 'block';
export type BlockingState = 'enabled' | 'disabled';

export interface BlockingStatus extends ApiResponseBase {
  blocking: BlockingState;
  timer: number | null;
}

export interface PiholeGroup {
  name: string;
  comment: string | null;
  enabled: boolean;
  id: number;
  date_added: number;
  date_modified: number;
}

export interface PiholeList {
  address: string;
  type: ListType;
  comment: string | null;
  groups: number[];
  enabled: boolean;
  id: number;
  date_added: number;
  date_modified: number;
  date_updated?: number;
  number?: number;
  invalid_domains?: number;
  abp_entries?: number;
  status?: number;
}

export interface PiHoleClientEntry {
  client: string;
  name?: string | null;
  comment: string | null;
  groups?: number[];
  id: number;
  date_added: number;
  date_modified: number;
}

export interface DomainEntry {
  domain: string;
  unicode?: string;
  type: DomainType;
  kind: DomainKind;
  enabled: boolean;
  comment: string | null;
  id: number;
  groups: number[];
  date_added: number;
  date_modified: number;
}

export interface GravitySearchEntry {
  domain: string;
  address: string;
  comment: string | null;
  enabled: boolean;
  id?: number;
  type?: ListType;
  date_added?: number;
  date_modified?: number;
  date_updated?: number;
  number?: number;
  invalid_domains?: number;
  abp_entries?: number;
  status?: number;
  groups?: number[];
}

export interface DomainSearchResult {
  domains: DomainEntry[];
  gravity: GravitySearchEntry[];
  parameters?: {
    partial?: boolean;
    N?: number;
    domain?: string;
    debug?: boolean;
  };
  results?: {
    domains?: {
      exact?: number;
      regex?: number;
    };
    gravity?: {
      allow?: number;
      block?: number;
    };
    total?: number;
  };
}

export interface ClientSuggestion {
  hwaddr: string | null;
  macVendor: string | null;
  lastQuery: number;
  addresses: string | null;
  names: string | null;
}

export interface GroupsResponse extends ApiResponseBase, ProcessedResponse {
  groups: PiholeGroup[];
}

export interface ListsResponse extends ApiResponseBase, ProcessedResponse {
  lists: PiholeList[];
}

export interface ClientsResponse extends ApiResponseBase, ProcessedResponse {
  clients: PiHoleClientEntry[];
}

export interface DomainsResponse extends ApiResponseBase, ProcessedResponse {
  domains: DomainEntry[];
}

export interface ClientSuggestionsResponse extends ApiResponseBase {
  clients: ClientSuggestion[];
}

export interface SearchResponse extends ApiResponseBase {
  search: DomainSearchResult;
}

export interface DomainMutationPayload {
  domain: string | string[];
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}

export interface DomainReplacePayload {
  type?: DomainType;
  kind?: DomainKind;
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}

export interface GroupMutationPayload {
  name: string | string[];
  comment?: string | null;
  enabled?: boolean;
}

export interface GroupReplacePayload {
  name?: string;
  comment?: string | null;
  enabled?: boolean;
}

export interface ClientMutationPayload {
  client: string | string[];
  comment?: string | null;
  groups?: number[];
}

export interface ClientReplacePayload {
  comment?: string | null;
  groups?: number[];
}

export interface ListMutationPayload {
  address: string | string[];
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}

export interface ListReplacePayload {
  type: ListType;
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}
