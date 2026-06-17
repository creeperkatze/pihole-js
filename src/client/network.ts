import { PiHoleClientCore } from './core.js';
import type {
  DetailedNetworkOptions,
  GatewayResponse,
  InterfacesResponse,
  NetworkDevicesOptions,
  NetworkDevicesResponse,
  RoutesResponse,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class NetworkApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getDevices(options?: NetworkDevicesOptions): Promise<NetworkDevicesResponse> {
    return this.core.requestJson<NetworkDevicesResponse>('network/devices', { query: options });
  }

  async deleteDevice(deviceId: number): Promise<void> {
    await this.core.requestVoid(`network/devices/${encodeSegment(deviceId)}`, { method: 'DELETE' });
  }

  async getGateway(options?: DetailedNetworkOptions): Promise<GatewayResponse> {
    return this.core.requestJson<GatewayResponse>('network/gateway', { query: options });
  }

  async getRoutes(options?: DetailedNetworkOptions): Promise<RoutesResponse> {
    return this.core.requestJson<RoutesResponse>('network/routes', { query: options });
  }

  async getInterfaces(options?: DetailedNetworkOptions): Promise<InterfacesResponse> {
    return this.core.requestJson<InterfacesResponse>('network/interfaces', { query: options });
  }
}
