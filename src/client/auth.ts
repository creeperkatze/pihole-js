import { PiHoleClientCore } from './core.js';
import type {
  AppPasswordResponse,
  AuthRequest,
  AuthResponse,
  AuthSessionsResponse,
  TotpResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

/** Handles authentication, sessions, TOTP, and app passwords. */
export class AuthApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns the current auth state without requiring credentials. */
  async check(): Promise<AuthResponse> {
    return this.core.requestJson<AuthResponse>('auth', { auth: 'none' });
  }

  /**
   * Authenticates with Pi-hole. Passes credentials directly if provided,
   * otherwise uses the client's configured password and session cache.
   */
  async login(credentials?: AuthRequest): Promise<AuthResponse> {
    if (credentials) {
      return this.core.loginWithCredentials(credentials);
    }

    return this.core.withSession(async () => this.core.requestJson<AuthResponse>('auth', { auth: 'none' }));
  }

  /** Ends the current session. */
  async logout(): Promise<void> {
    await this.core.logoutSession();
  }

  /** Returns all active sessions. */
  async getSessions(): Promise<AuthSessionsResponse> {
    return this.core.requestJson<AuthSessionsResponse>('auth/sessions');
  }

  /** Generates a new TOTP secret and returns setup data. */
  async generateTotp(): Promise<TotpResponse> {
    return this.core.requestJson<TotpResponse>('auth/totp');
  }

  /** Terminates a session by its ID. */
  async deleteSession(id: number): Promise<void> {
    await this.core.requestVoid(`auth/session/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  /** Generates a one-time app password. */
  async createAppPassword(): Promise<AppPasswordResponse> {
    return this.core.requestJson<AppPasswordResponse>('auth/app');
  }
}
