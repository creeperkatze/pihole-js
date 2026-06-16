import type { ApiResponseBase, JsonObject, JsonValue } from './base.js';

export interface LogLine {
  timestamp: number;
  message: string;
  prio?: string | null;
}

export interface LogsResponse extends ApiResponseBase {
  log: LogLine[];
  nextID?: number;
  pid?: number;
  file?: string;
}

export interface EndpointDescriptor {
  uri: string;
  parameters: string;
}

export interface EndpointsResponse extends ApiResponseBase {
  endpoints: Partial<Record<'get' | 'post' | 'put' | 'patch' | 'delete', EndpointDescriptor[]>>;
}

export interface ConfigResponse extends ApiResponseBase {
  config: JsonObject;
}

export interface GatewayResponse extends ApiResponseBase {
  gateway: Array<Record<string, JsonValue>>;
}

export interface RoutesResponse extends ApiResponseBase {
  routes: Array<Record<string, JsonValue>>;
}

export interface InterfacesResponse extends ApiResponseBase {
  interfaces: Array<Record<string, JsonValue>>;
}

export interface NetworkDevicesResponse extends ApiResponseBase {
  devices: Array<Record<string, JsonValue>>;
}

export interface DhcpLease {
  expires: number;
  name: string;
  hwaddr: string;
  ip: string;
  clientid: string;
}

export interface DhcpLeasesResponse extends ApiResponseBase {
  leases: DhcpLease[];
}

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

export interface TeleporterImportResponse extends ApiResponseBase {
  processed: string[];
}
