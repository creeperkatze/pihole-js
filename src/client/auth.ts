import { PiHoleClientCore } from './core.js';
import type {
  AppPasswordResponse,
  AuthRequest,
  AuthResponse,
  AuthSessionsResponse,
  TotpResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class AuthApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async check(): Promise<AuthResponse> {
    return this.core.requestJson<AuthResponse>('auth', { auth: 'none' });
  }

  async login(credentials?: AuthRequest): Promise<AuthResponse> {
    if (credentials) {
      return this.core.loginWithCredentials(credentials);
    }

    return this.core.withSession(async () => this.core.requestJson<AuthResponse>('auth', { auth: 'none' }));
  }

  async logout(): Promise<void> {
    await this.core.logoutSession();
  }

  async getSessions(): Promise<AuthSessionsResponse> {
    return this.core.requestJson<AuthSessionsResponse>('auth/sessions');
  }

  async getTotp(): Promise<TotpResponse> {
    return this.core.requestJson<TotpResponse>('auth/totp');
  }

  async deleteSession(id: number): Promise<void> {
    await this.core.requestVoid(`auth/session/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  async createAppPassword(): Promise<AppPasswordResponse> {
    return this.core.requestJson<AppPasswordResponse>('auth/app');
  }
}
