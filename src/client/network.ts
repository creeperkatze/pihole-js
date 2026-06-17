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

/** Reads network topology: devices, gateway, routes, and interfaces. */
export class NetworkApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns network devices known to Pi-hole. */
  async getDevices(options?: NetworkDevicesOptions): Promise<NetworkDevicesResponse> {
    return this.core.requestJson<NetworkDevicesResponse>('network/devices', { query: options });
  }

  /** Removes a network device from the table by its ID. */
  async deleteDevice(deviceId: number): Promise<void> {
    await this.core.requestVoid(`network/devices/${encodeSegment(deviceId)}`, { method: 'DELETE' });
  }

  /** Returns gateway information. */
  async getGateway(options?: DetailedNetworkOptions): Promise<GatewayResponse> {
    return this.core.requestJson<GatewayResponse>('network/gateway', { query: options });
  }

  /** Returns the routing table. */
  async getRoutes(options?: DetailedNetworkOptions): Promise<RoutesResponse> {
    return this.core.requestJson<RoutesResponse>('network/routes', { query: options });
  }

  /** Returns network interface details. */
  async getInterfaces(options?: DetailedNetworkOptions): Promise<InterfacesResponse> {
    return this.core.requestJson<InterfacesResponse>('network/interfaces', { query: options });
  }
}
