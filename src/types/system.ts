import type { ApiResponseBase, JsonObject } from './base.js';

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

/** Address family of a route or interface address. */
export type AddressFamily = 'inet' | 'inet6' | 'link' | 'mpls' | 'bridge' | '???';

/** A byte count with a human readable unit. */
export interface ByteCount {
  value: number;
  unit: string;
}

/** The default gateway of an address family. */
export interface Gateway {
  family: string;
  interface: string;
  address: string;
  /** Local addresses of the gateway interface. */
  local: string[];
}

/** A routing table entry. Most fields depend on the route type. */
export interface Route {
  family: AddressFamily;
  table: number;
  protocol: string;
  scope: string;
  type: string;
  flags: string[];
  gateway?: string;
  oif?: string;
  iif?: string;
  dst?: string;
  src?: string;
  prefsrc?: string;
  priority?: number;
  pref?: number;
}

/** An address assigned to a network interface. */
export interface InterfaceAddress {
  address: string;
  family: AddressFamily;
  prefixlen: number;
  flags: string[];
  scope: string;
  address_type?: string;
  broadcast?: string;
  broadcast_type?: string;
  local?: string;
  local_type?: string;
  label?: string;
  prefered?: number;
  valid?: number;
  cstamp?: number;
  tstamp?: number;
}

/** A network interface. Most fields depend on the interface type and state. */
export interface NetworkInterface {
  name: string;
  type: string;
  flags: string[];
  state: string;
  carrier: boolean;
  proto_down: boolean;
  /** Link speed in Mbit/s, `null` if not applicable. */
  speed: number | null;
  address?: string;
  broadcast?: string;
  perm_address?: string;
  stats?: {
    rx_bytes: ByteCount;
    tx_bytes: ByteCount;
  };
  addresses?: InterfaceAddress[] | null;
}

/** Network gateway information. Interfaces and routes are only included with `detailed`. */
export interface GatewayResponse extends ApiResponseBase {
  gateway: Gateway[];
  interfaces?: NetworkInterface[];
  routes?: Route[];
}

/** Network routing table entries. */
export interface RoutesResponse extends ApiResponseBase {
  routes: Route[];
}

/** Network interface details. */
export interface InterfacesResponse extends ApiResponseBase {
  interfaces: NetworkInterface[];
}

/** An address a network device was seen with. */
export interface NetworkDeviceAddress {
  ip: string;
  name: string | null;
  lastSeen: number;
  nameUpdated: number;
}

/** A device Pi-hole has seen on the network. */
export interface NetworkDevice {
  id: number;
  hwaddr: string;
  interface: string;
  firstSeen: number;
  lastQuery: number;
  numQueries: number;
  macVendor: string | null;
  ips: NetworkDeviceAddress[];
}

/** Known network devices detected by Pi-hole. */
export interface NetworkDevicesResponse extends ApiResponseBase {
  devices: NetworkDevice[];
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
