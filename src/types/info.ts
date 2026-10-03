import type { ApiResponseBase } from './base.js';

/** An HTTP header of the request as Pi-hole received it. */
export interface ClientHeader {
  name: string;
  value: string;
}

/** Info about the HTTP client making the request. */
export interface ClientInfoResponse extends ApiResponseBase {
  remote_addr: string;
  http_version: string;
  method: string;
  headers: ClientHeader[];
}

/** Resource usage of the machine and the FTL process. */
export interface SystemInfo {
  /** Uptime in seconds. */
  uptime: number;
  memory: {
    ram: {
      total: number;
      free: number;
      used: number;
      available: number;
      '%used': number;
    };
    swap: {
      total: number;
      used: number;
      free: number;
      '%used': number;
    };
  };
  /** Number of running processes. */
  procs: number;
  cpu: {
    /** Number of CPU cores. */
    nprocs: number;
    '%cpu': number;
    load: {
      /** Load averages over 1, 5 and 15 minutes. */
      raw: number[];
      /** Load averages as a percentage of the available cores. */
      percent: number[];
    };
  };
  ftl: {
    '%mem': number;
    '%cpu': number;
  };
}

/** System resource usage. */
export interface SystemInfoResponse extends ApiResponseBase {
  system: SystemInfo;
}

/** A single temperature reading of a sensor. */
export interface SensorTemperature {
  name: string | null;
  value: number;
  max: number | null;
  crit: number | null;
  sensor: string;
}

/** A hardware sensor and its temperature readings. */
export interface Sensor {
  name: string | null;
  path: string;
  source: string;
  temps: SensorTemperature[];
}

/** Hardware sensors and the CPU temperature. */
export interface SensorsInfo {
  list: Sensor[];
  /** CPU temperature, `null` if no sensor reports it. */
  cpu_temp: number | null;
  /** Temperature above which Pi-hole warns. */
  hot_limit: number;
  /** Temperature unit, like `C`, `F` or `K`. */
  unit: string;
}

/** Sensor readings. */
export interface SensorsResponse extends ApiResponseBase {
  sensors: SensorsInfo;
}

/** Details about the host machine. */
export interface HostInfo {
  uname: {
    domainname: string;
    machine: string;
    nodename: string;
    release: string;
    sysname: string;
    version: string;
  };
  /** Device model, `null` if unknown. */
  model: string | null;
  dmi: {
    bios: { vendor: string | null };
    board: { name: string | null; vendor: string | null; version: string | null };
    product: { name: string | null; version: string | null; family: string | null };
    sys: { vendor: string | null };
  };
}

/** Host machine information. */
export interface HostInfoResponse extends ApiResponseBase {
  host: HostInfo;
}

/** Total and enabled count of allowed or denied entries. */
export interface EntryCount {
  total: number;
  enabled: number;
}

/** Details about the FTL process and its database. */
export interface FtlInfo {
  database: {
    /** Number of exact domains on blocking lists. */
    gravity: number;
    /** Number of exact domains on allowing lists. */
    antigravity: number;
    groups: number;
    lists: number;
    clients: number;
    domains: { allowed: EntryCount; denied: EntryCount };
    regex: { allowed: EntryCount; denied: EntryCount };
  };
  privacy_level: number;
  /** Average number of queries per second. */
  query_frequency: number;
  clients: { total: number; active: number };
  pid: number;
  /** FTL uptime in milliseconds. */
  uptime: number;
  '%mem': number;
  '%cpu': number;
  allow_destructive: boolean;
  /** Raw dnsmasq counters. */
  dnsmasq: Record<string, number>;
}

/** FTL process details. */
export interface FtlInfoResponse extends ApiResponseBase {
  ftl: FtlInfo;
}

/** Size and query counts of the long-term database. */
export interface DatabaseInfoResponse extends ApiResponseBase {
  /** File size in bytes. */
  size: number;
  type: string;
  mode: string;
  atime: number;
  mtime: number;
  ctime: number;
  owner: {
    user: { uid: number; name: string; info: string };
    group: { gid: number; name: string };
  };
  /** Number of queries in the in-memory database. */
  queries: number;
  earliest_timestamp: number;
  /** Number of queries in the on-disk database. */
  queries_disk: number;
  earliest_timestamp_disk: number;
  sqlite_version: string;
}

/** A Pi-hole diagnosis message. */
export interface PiholeMessage {
  id: number;
  timestamp: number;
  type: string;
  plain: string;
  html: string;
}

/** Pi-hole diagnosis messages. */
export interface MessagesResponse extends ApiResponseBase {
  messages: PiholeMessage[];
}

/** Number of cached records of one type. */
export interface CacheContent {
  type: number;
  name: string;
  count: { valid: number; stale: number };
}

/** DNS and DHCP metrics. */
export interface Metrics {
  dns: {
    cache: {
      size: number;
      inserted: number;
      evicted: number;
      expired: number;
      immortal: number;
      content: CacheContent[];
    };
    replies: {
      forwarded: number;
      unanswered: number;
      local: number;
      optimized: number;
      auth: number;
      sum: number;
    };
  };
  dhcp: {
    ack: number;
    nak: number;
    decline: number;
    offer: number;
    discover: number;
    inform: number;
    request: number;
    release: number;
    noanswer: number;
    bootp: number;
    pxe: number;
    leases: {
      allocated_4: number;
      pruned_4: number;
      allocated_6: number;
      pruned_6: number;
    };
  };
}

/** DNS and DHCP metrics. */
export interface MetricsResponse extends ApiResponseBase {
  metrics: Metrics;
}

/** Login page setup. */
export interface LoginInfoResponse extends ApiResponseBase {
  /** HTTPS port of the web interface, `0` if HTTPS is disabled. */
  https_port: number;
  /** Whether the DNS server is running. Only `false` when it failed. */
  dns: boolean;
}

/** Installed build of a Pi-hole component. */
export interface ComponentLocalVersion {
  branch: string | null;
  version: string | null;
  hash: string | null;
}

/** Installed build of Pi-hole FTL, including its build time. */
export interface FtlLocalVersion extends ComponentLocalVersion {
  date: string | null;
}

/** Latest release of a Pi-hole component. Both fields are `null` on custom branches. */
export interface ComponentRemoteVersion {
  version: string | null;
  hash: string | null;
}

/** Installed build and latest release of a Pi-hole component. */
export interface ComponentVersion<Local extends ComponentLocalVersion = ComponentLocalVersion> {
  local: Local;
  remote: ComponentRemoteVersion;
}

/** Installed and latest Docker image tag. Both are `null` when not running in Docker. */
export interface DockerVersion {
  local: string | null;
  remote: string | null;
}

/** Versions of all Pi-hole components. */
export interface VersionInfo {
  core: ComponentVersion;
  web: ComponentVersion;
  ftl: ComponentVersion<FtlLocalVersion>;
  docker: DockerVersion;
}

/** Versions of all Pi-hole components. */
export interface VersionResponse extends ApiResponseBase {
  version: VersionInfo;
}
