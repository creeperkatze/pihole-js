import { PiHoleClientCore } from './core.js';
import type { GravityOptions, SuccessResponse } from '../types/index.js';

/** Provides administrative actions like gravity updates and cache flushing. */
export class ActionsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Runs a gravity update and returns the streamed output as text. */
  async updateGravity(options?: GravityOptions): Promise<string> {
    return this.core.requestText('action/gravity', {
      method: 'POST',
      query: options,
    });
  }

  /** Restarts the DNS resolver. */
  async restartDns(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/restartdns', { method: 'POST' });
  }

  /** Clears the Pi-hole query log. */
  async flushLogs(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/flush/logs', { method: 'POST' });
  }

  /** Clears the ARP cache. */
  async flushArp(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/flush/arp', { method: 'POST' });
  }

  /** Clears the network device table. */
  async flushNetwork(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/flush/network', { method: 'POST' });
  }
}
