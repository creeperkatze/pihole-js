import { PiHoleClientCore } from './core.js';
import type { DhcpLeasesResponse } from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

/** Manages DHCP leases. */
export class DhcpApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns all active DHCP leases. */
  async getLeases(): Promise<DhcpLeasesResponse> {
    return this.core.requestJson<DhcpLeasesResponse>('dhcp/leases');
  }

  /** Removes a DHCP lease by IP address. */
  async deleteLease(ip: string): Promise<void> {
    await this.core.requestVoid(`dhcp/leases/${encodeSegment(ip)}`, { method: 'DELETE' });
  }
}
