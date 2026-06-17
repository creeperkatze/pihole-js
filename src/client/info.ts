import { PiHoleClientCore } from './core.js';
import type {
  CountResponse,
  GenericApiResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class InfoApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getClient(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/client', { auth: 'none' });
  }

  async getSystem(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/system');
  }

  async getDatabase(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/database');
  }

  async getFtl(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/ftl');
  }

  async getHost(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/host');
  }

  async getSensors(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/sensors');
  }

  async getVersion(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/version');
  }

  async getMessages(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/messages');
  }

  async deleteMessage(id: number): Promise<void> {
    await this.core.requestVoid(`info/messages/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  async getMessagesCount(): Promise<CountResponse> {
    return this.core.requestJson<CountResponse>('info/messages/count');
  }

  async getMetrics(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/metrics');
  }

  async getLogin(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/login', { auth: 'none' });
  }
}
