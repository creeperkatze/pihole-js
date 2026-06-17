import type { ApiResponseBase, ProcessedResponse } from './base.js';

/** Whether a domain is on the allowlist or denylist. */
export type DomainType = 'allow' | 'deny';
/** Whether a domain entry is a literal match or a regex pattern. */
export type DomainKind = 'exact' | 'regex';
/** Whether a subscription list is an allowlist or a blocklist. */
export type ListType = 'allow' | 'block';
/** Current DNS blocking state. */
export type BlockingState = 'enabled' | 'disabled';

/** Current DNS blocking state and optional timer. */
export interface BlockingStatus extends ApiResponseBase {
  blocking: BlockingState;
  /** Seconds remaining until blocking state reverts, or null if no timer is active. */
  timer: number | null;
}

/** A Pi-hole group entry. */
export interface PiholeGroup {
  name: string;
  comment: string | null;
  enabled: boolean;
  id: number;
  date_added: number;
  date_modified: number;
}

/** A subscription-style block or allow list. */
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

/** A DNS client registered in Pi-hole. */
export interface PiHoleClientEntry {
  client: string;
  name?: string | null;
  comment: string | null;
  groups?: number[];
  id: number;
  date_added: number;
  date_modified: number;
}

/** An individual domain list entry. */
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

/** A domain matched via a gravity list during a search. */
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

/** Results of a domain search across lists and domains. */
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

/** A known client suggested for autocomplete. */
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

/** Payload for creating one or more domain entries. */
export interface DomainMutationPayload {
  domain: string | string[];
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}

/** Payload for updating an existing domain entry. */
export interface DomainUpdatePayload {
  type?: DomainType;
  kind?: DomainKind;
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}

/** Payload for creating one or more groups. */
export interface GroupMutationPayload {
  name: string | string[];
  comment?: string | null;
  enabled?: boolean;
}

/** Payload for updating an existing group. */
export interface GroupUpdatePayload {
  name?: string;
  comment?: string | null;
  enabled?: boolean;
}

/** Payload for creating one or more client entries. */
export interface ClientMutationPayload {
  client: string | string[];
  comment?: string | null;
  groups?: number[];
}

/** Payload for updating a client entry. */
export interface ClientUpdatePayload {
  comment?: string | null;
  groups?: number[];
}

/** Payload for creating one or more subscription lists. */
export interface ListMutationPayload {
  address: string | string[];
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}

/** Payload for updating an existing subscription list. */
export interface ListUpdatePayload {
  type: ListType;
  comment?: string | null;
  groups?: number[];
  enabled?: boolean;
}
