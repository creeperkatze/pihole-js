import type { ApiResponseBase, JsonObject, JsonValue } from './base.js';

/** A single log line with timestamp and optional severity. */
export interface LogLine {
  timestamp: number;
  message: string;
  prio?: string | null;
}

/** Paginated log output with a cursor for incremental polling. */
export interface LogsResponse extends ApiResponseBase {
  log: LogLine[];
  /** ID to pass as `nextID` on the next request to resume where this left off. */
  nextID?: number;
  pid?: number;
  file?: string;
}

/** Describes a single API endpoint. */
export interface EndpointDescriptor {
  uri: string;
  parameters: string;
}

/** All available API endpoints grouped by HTTP method. */
export interface EndpointsResponse extends ApiResponseBase {
  endpoints: Partial<Record<'get' | 'post' | 'put' | 'patch' | 'delete', EndpointDescriptor[]>>;
}

/** The current Pi-hole configuration as a nested object. */
export interface ConfigResponse extends ApiResponseBase {
  config: JsonObject;
}

/** Network gateway information. */
export interface GatewayResponse extends ApiResponseBase {
  gateway: Array<Record<string, JsonValue>>;
}

/** Network routing table entries. */
export interface RoutesResponse extends ApiResponseBase {
  routes: Array<Record<string, JsonValue>>;
}

/** Network interface details. */
export interface InterfacesResponse extends ApiResponseBase {
  interfaces: Array<Record<string, JsonValue>>;
}

/** Known network devices detected by Pi-hole. */
export interface NetworkDevicesResponse extends ApiResponseBase {
  devices: Array<Record<string, JsonValue>>;
}

/** An active DHCP lease. */
export interface DhcpLease {
  expires: number;
  name: string;
  hwaddr: string;
  ip: string;
  clientid: string;
}

/** All active DHCP leases. */
export interface DhcpLeasesResponse extends ApiResponseBase {
  leases: DhcpLease[];
}

/** Specifies which parts of a teleporter backup to restore. */
export interface TeleporterImportSelection {
  config?: boolean;
  dhcp_leases?: boolean;
  gravity?: {
    group?: boolean;
    adlist?: boolean;
    adlist_by_group?: boolean;
    domainlist?: boolean;
    domainlist_by_group?: boolean;
    client?: boolean;
    client_by_group?: boolean;
  };
}

/** Result of a teleporter import listing what was restored. */
export interface TeleporterImportResponse extends ApiResponseBase {
  processed: string[];
}
