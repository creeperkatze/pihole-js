import { PiHoleClientCore } from './core.js';
import type { LogsOptions, LogsResponse } from '../types/index.js';

/** Fetches system log entries for dnsmasq, FTL, and the web server. */
export class LogsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns dnsmasq log entries. */
  async getDnsmasq(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/dnsmasq', { query: options });
  }

  /** Returns FTL process log entries. */
  async getFtl(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/ftl', { query: options });
  }

  /** Returns web server log entries. */
  async getWebserver(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/webserver', { query: options });
  }
}
