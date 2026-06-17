import { PiHoleClientCore } from './core.js';
import type { GravityOptions, SuccessResponse } from '../types/index.js';

export class ActionsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async updateGravity(options?: GravityOptions): Promise<string> {
    return this.core.requestText('action/gravity', {
      method: 'POST',
      query: options,
    });
  }

  async restartDns(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/restartdns', { method: 'POST' });
  }

  async flushLogs(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/flush/logs', { method: 'POST' });
  }

  async flushArp(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/flush/arp', { method: 'POST' });
  }

  async flushNetwork(): Promise<SuccessResponse> {
    return this.core.requestJson<SuccessResponse>('action/flush/network', { method: 'POST' });
  }
}
