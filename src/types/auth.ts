import type { ApiResponseBase } from './base.js';

/** Session state returned after authentication or an auth check. */
export interface AuthSession {
  valid: boolean;
  totp?: boolean;
  sid: string | null;
  csrf?: string | null;
  /** Remaining session lifetime in seconds. */
  validity: number;
  message: string | null;
}

/** Response from a login request or auth status check. */
export interface AuthResponse extends ApiResponseBase {
  session?: AuthSession;
}

/** Credentials for password-based login. */
export interface AuthRequest {
  password: string;
  /** TOTP code, required when TOTP is enabled. */
  totp?: string;
}

/** Details about a single active session. */
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

/** Response listing all active sessions. */
export interface AuthSessionsResponse extends ApiResponseBase {
  sessions: AuthSessionInfo[];
}

/** Contains TOTP setup data including the shared secret and backup codes. */
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

/** Contains a newly generated app password and its hash. */
export interface AppPasswordResponse extends ApiResponseBase {
  app: {
    password: string;
    hash: string;
  };
}
