import { PiHoleClientCore } from './core.js';
import type { BlockingStatus } from '../types/index.js';

export class DnsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getStatus(): Promise<BlockingStatus> {
    return this.core.requestJson<BlockingStatus>('dns/blocking');
  }

  async enable(): Promise<BlockingStatus> {
    return this.setBlocking(true);
  }

  async disable(seconds?: number): Promise<BlockingStatus> {
    return this.setBlocking(false, seconds);
  }

  async setBlocking(blocking: boolean, timer?: number | null): Promise<BlockingStatus> {
    return this.core.requestJson<BlockingStatus>('dns/blocking', {
      method: 'POST',
      body: {
        blocking,
        timer: timer ?? null,
      },
    });
  }
}
