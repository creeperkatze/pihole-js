export interface PiHoleClientOptions {
  baseUrl: string;
  password?: string;
  timeoutMs?: number;
  fetch?: typeof globalThis.fetch;
  sessionStore?: SessionStore;
}

export interface SessionEntry {
  sid: string;
  expiresAt?: number;
}

export interface SessionStore {
  get(baseUrl: string): Promise<SessionEntry | null>;
  set(baseUrl: string, entry: SessionEntry): Promise<void>;
  delete(baseUrl: string): Promise<void>;
}

export interface BlockingStatus {
  blocking: 'enabled' | 'disabled';
  timer: number | null;
}

export interface HistoryPoint {
  timestamp: number;
  total: number;
  cached: number;
  blocked: number;
  forwarded: number;
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
  type: 'allow' | 'block';
  comment: string | null;
  groups: number[];
  enabled: boolean;
  id: number;
  date_added: number;
  date_modified: number;
}

export interface PiholeDiagnosis {
  cpu: number;
  memory: number;
  temperature: number | null;
  tempUnit: string;
  uptime: number;
}

export interface PiholeSummary {
  queries: {
    total: number;
    blocked: number;
    percent_blocked: number;
    unique_domains: number;
    cached: number;
    forwarded: number;
    types: Record<string, number>;
  };
  clients: {
    active: number;
    total: number;
  };
  blocking: BlockingStatus;
  history: HistoryPoint[];
  groups: PiholeGroup[];
  lists: PiholeList[];
  diagnosis: PiholeDiagnosis | null;
}

export interface DomainEntry {
  domain: string;
  type: 'allow' | 'deny';
  kind: 'exact' | 'regex';
  enabled: boolean;
  comment: string | null;
  id: number;
  groups: number[];
}

export interface DomainSearchResult {
  domains: DomainEntry[];
  gravity: Array<{ domain: string; address: string; comment: string | null; enabled: boolean }>;
}

export interface AuthResponse {
  session?: {
    valid: boolean;
    sid: string | null;
    message: string | null;
    validity: number;
  };
}
