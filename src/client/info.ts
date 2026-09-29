import { PiHoleClientCore } from './core.js';
import type {
  ClientInfoResponse,
  CountResponse,
  DatabaseInfoResponse,
  FtlInfoResponse,
  HostInfoResponse,
  LoginInfoResponse,
  MessagesResponse,
  MetricsResponse,
  SensorsResponse,
  SystemInfoResponse,
  VersionResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

/** Returns system and runtime information about the Pi-hole instance. */
export class InfoApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns info about the HTTP client making this request. Does not require authentication. */
  async getClient(): Promise<ClientInfoResponse> {
    return this.core.requestJson<ClientInfoResponse>('info/client', { auth: 'none' });
  }

  /** Returns system resource usage (CPU, memory, disk). */
  async getSystem(): Promise<SystemInfoResponse> {
    return this.core.requestJson<SystemInfoResponse>('info/system');
  }

  /** Returns database size and query count information. */
  async getDatabase(): Promise<DatabaseInfoResponse> {
    return this.core.requestJson<DatabaseInfoResponse>('info/database');
  }

  /** Returns FTL process details. */
  async getFtl(): Promise<FtlInfoResponse> {
    return this.core.requestJson<FtlInfoResponse>('info/ftl');
  }

  /** Returns host machine information. */
  async getHost(): Promise<HostInfoResponse> {
    return this.core.requestJson<HostInfoResponse>('info/host');
  }

  /** Returns sensor readings such as CPU temperature. */
  async getSensors(): Promise<SensorsResponse> {
    return this.core.requestJson<SensorsResponse>('info/sensors');
  }

  /** Returns version information for all Pi-hole components. */
  async getVersion(): Promise<VersionResponse> {
    return this.core.requestJson<VersionResponse>('info/version');
  }

  /** Returns Pi-hole notification messages. */
  async getMessages(): Promise<MessagesResponse> {
    return this.core.requestJson<MessagesResponse>('info/messages');
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
  async getMetrics(): Promise<MetricsResponse> {
    return this.core.requestJson<MetricsResponse>('info/metrics');
  }

  /** Returns login page configuration. Does not require authentication. */
  async getLogin(): Promise<LoginInfoResponse> {
    return this.core.requestJson<LoginInfoResponse>('info/login', { auth: 'none' });
  }
}
