import { PiHoleClientCore } from './core.js';
import type { LogsOptions, LogsResponse } from '../types/index.js';

export class LogsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getDnsmasq(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/dnsmasq', { query: options });
  }

  async getFtl(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/ftl', { query: options });
  }

  async getWebserver(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/webserver', { query: options });
  }
}
