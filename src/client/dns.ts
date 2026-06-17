import { PiHoleClientCore } from './core.js';
import type { BlockingStatus } from '../types/index.js';

/** Controls DNS blocking state. */
export class DnsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns the current blocking state and remaining timer. */
  async getStatus(): Promise<BlockingStatus> {
    return this.core.requestJson<BlockingStatus>('dns/blocking');
  }

  /** Enables DNS blocking. */
  async enable(): Promise<BlockingStatus> {
    return this.setBlocking(true);
  }

  /** Disables DNS blocking, optionally for a fixed number of seconds. */
  async disable(seconds?: number): Promise<BlockingStatus> {
    return this.setBlocking(false, seconds);
  }

  /** Sets blocking state directly with an optional auto-revert timer in seconds. */
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
