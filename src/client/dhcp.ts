import { PiHoleClientCore } from './core.js';
import type { DhcpLeasesResponse } from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class DhcpApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getLeases(): Promise<DhcpLeasesResponse> {
    return this.core.requestJson<DhcpLeasesResponse>('dhcp/leases');
  }

  async deleteLease(ip: string): Promise<void> {
    await this.core.requestVoid(`dhcp/leases/${encodeSegment(ip)}`, { method: 'DELETE' });
  }
}
