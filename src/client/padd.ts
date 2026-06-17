import { PiHoleClientCore } from './core.js';
import type { PaddResponse } from '../types/index.js';

/** Fetches summary metrics for the PADD dashboard. */
export class PaddApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns PADD metrics including CPU, memory, and uptime. */
  async getSummary(): Promise<PaddResponse> {
    return this.core.requestJson<PaddResponse>('padd');
  }
}
