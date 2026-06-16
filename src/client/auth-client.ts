import { PiHoleClientCore } from '../core/index.js';
import type {
  AppPasswordResponse,
  AuthRequest,
  AuthResponse,
  AuthSessionsResponse,
  PiHoleClientOptions,
  TotpResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class AuthClient extends PiHoleClientCore {
  constructor(options: PiHoleClientOptions) {
    super(options);
  }

  async checkAuth(): Promise<AuthResponse> {
    return this.requestJson<AuthResponse>('auth', { auth: 'none' });
  }

  async login(credentials?: AuthRequest): Promise<AuthResponse> {
    if (credentials) {
      return this.loginWithCredentials(credentials);
    }

    return this.withSession(async () => this.requestJson<AuthResponse>('auth', { auth: 'none' }));
  }

  async logout(): Promise<void> {
    await this.logoutSession();
  }

  async getSessions(): Promise<AuthSessionsResponse> {
    return this.requestJson<AuthSessionsResponse>('auth/sessions');
  }

  async getTotp(): Promise<TotpResponse> {
    return this.requestJson<TotpResponse>('auth/totp');
  }

  async deleteSession(id: number): Promise<void> {
    await this.requestVoid(`auth/session/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  async createAppPassword(): Promise<AppPasswordResponse> {
    return this.requestJson<AppPasswordResponse>('auth/app');
  }
}
