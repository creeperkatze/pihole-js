import { PiHoleClientCore } from './core.js';
import type {
  CountResponse,
  GenericApiResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

/** Returns system and runtime information about the Pi-hole instance. */
export class InfoApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns info about the HTTP client making this request. Does not require authentication. */
  async getClient(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/client', { auth: 'none' });
  }

  /** Returns system resource usage (CPU, memory, disk). */
  async getSystem(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/system');
  }

  /** Returns database size and query count information. */
  async getDatabase(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/database');
  }

  /** Returns FTL process details. */
  async getFtl(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/ftl');
  }

  /** Returns host machine information. */
  async getHost(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/host');
  }

  /** Returns sensor readings such as CPU temperature. */
  async getSensors(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/sensors');
  }

  /** Returns version information for all Pi-hole components. */
  async getVersion(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/version');
  }

  /** Returns Pi-hole notification messages. */
  async getMessages(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/messages');
  }

  /** Dismisses a notification message by its ID. */
  async deleteMessage(id: number): Promise<void> {
    await this.core.requestVoid(`info/messages/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  /** Returns the number of unread notification messages. */
  async getMessagesCount(): Promise<CountResponse> {
    return this.core.requestJson<CountResponse>('info/messages/count');
  }

  /** Returns Prometheus-compatible metrics. */
  async getMetrics(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/metrics');
  }

  /** Returns login page configuration. Does not require authentication. */
  async getLogin(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/login', { auth: 'none' });
  }
}
