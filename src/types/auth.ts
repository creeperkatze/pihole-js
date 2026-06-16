import type { ApiResponseBase } from './base.js';

export interface AuthSession {
  valid: boolean;
  totp?: boolean;
  sid: string | null;
  csrf?: string | null;
  validity: number;
  message: string | null;
}

export interface AuthResponse extends ApiResponseBase {
  session?: AuthSession;
}

export interface AuthRequest {
  password: string;
  totp?: string;
}

export interface AuthSessionInfo {
  id: number;
  current_session: boolean;
  valid: boolean;
  tls?: {
    login?: boolean;
    mixed?: boolean;
  };
  app?: boolean;
  cli?: boolean;
  login_at?: number;
  last_active?: number;
  valid_until?: number;
  remote_addr?: string;
  user_agent?: string | null;
  x_forwarded_for?: string | null;
}

export interface AuthSessionsResponse extends ApiResponseBase {
  sessions: AuthSessionInfo[];
}

export interface TotpResponse extends ApiResponseBase {
  totp: {
    type?: string;
    account?: string;
    issuer?: string;
    algorithm?: string;
    digits?: number;
    period?: number;
    offset?: number;
    secret?: string;
    codes?: number[];
  };
}

export interface AppPasswordResponse extends ApiResponseBase {
  app: {
    password: string;
    hash: string;
  };
}
