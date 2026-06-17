import { PiHoleClientCore } from './core.js';
import type { PaddResponse } from '../types/index.js';

export class PaddApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getSummary(): Promise<PaddResponse> {
    return this.core.requestJson<PaddResponse>('padd');
  }
}
