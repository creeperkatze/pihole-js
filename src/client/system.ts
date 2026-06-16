import { ManagementClient } from './management.js';
import type {
  ConfigMutationOptions,
  ConfigQueryOptions,
  ConfigResponse,
  CountResponse,
  DetailedNetworkOptions,
  DhcpLeasesResponse,
  EndpointsResponse,
  GatewayResponse,
  GenericApiResponse,
  GravityOptions,
  InterfacesResponse,
  LogsOptions,
  LogsResponse,
  NetworkDevicesOptions,
  NetworkDevicesResponse,
  PaddResponse,
  PiHoleClientOptions,
  RoutesResponse,
  SearchOptions,
  SearchResponse,
  SuccessResponse,
  TeleporterImportResponse,
  TeleporterImportSelection,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class SystemClient extends ManagementClient {
  constructor(options: PiHoleClientOptions) {
    super(options);
  }

  async getInfoClient(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/client', { auth: 'none' });
  }

  async getInfoSystem(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/system');
  }

  async getInfoDatabase(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/database');
  }

  async getInfoFtl(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/ftl');
  }

  async getInfoHost(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/host');
  }

  async getInfoSensors(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/sensors');
  }

  async getInfoVersion(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/version');
  }

  async getInfoMessages(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/messages');
  }

  async deleteInfoMessages(messageIds: string | number | Array<string | number>): Promise<void> {
    const id = Array.isArray(messageIds) ? messageIds.join(',') : String(messageIds);
    await this.requestVoid(`info/messages/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  async getInfoMessagesCount(): Promise<CountResponse> {
    return this.requestJson<CountResponse>('info/messages/count');
  }

  async getInfoMetrics(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/metrics');
  }

  async getInfoLogin(): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>('info/login', { auth: 'none' });
  }

  async getDnsmasqLog(options?: LogsOptions): Promise<LogsResponse> {
    return this.requestJson<LogsResponse>('logs/dnsmasq', { query: options });
  }

  async getFtlLog(options?: LogsOptions): Promise<LogsResponse> {
    return this.requestJson<LogsResponse>('logs/ftl', { query: options });
  }

  async getWebserverLog(options?: LogsOptions): Promise<LogsResponse> {
    return this.requestJson<LogsResponse>('logs/webserver', { query: options });
  }

  async getEndpoints(): Promise<EndpointsResponse> {
    return this.requestJson<EndpointsResponse>('endpoints');
  }

  async getConfig(options?: ConfigQueryOptions): Promise<ConfigResponse> {
    return this.requestJson<ConfigResponse>('config', { query: options });
  }

  async patchConfig(config: ConfigResponse['config'], options?: ConfigMutationOptions): Promise<ConfigResponse> {
    return this.requestJson<ConfigResponse>('config', {
      method: 'PATCH',
      query: options,
      body: { config },
    });
  }

  async getConfigElement(element: string, options?: ConfigQueryOptions): Promise<GenericApiResponse> {
    return this.requestJson<GenericApiResponse>(`config/${element.replace(/^\/+/, '')}`, { query: options });
  }

  async addConfigArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'PUT',
      query: options,
    });
  }

  async deleteConfigArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'DELETE',
      query: options,
    });
  }

  async getNetworkDevices(options?: NetworkDevicesOptions): Promise<NetworkDevicesResponse> {
    return this.requestJson<NetworkDevicesResponse>('network/devices', { query: options });
  }

  async deleteNetworkDevice(deviceId: number): Promise<void> {
    await this.requestVoid(`network/devices/${encodeSegment(deviceId)}`, { method: 'DELETE' });
  }

  async getNetworkGateway(options?: DetailedNetworkOptions): Promise<GatewayResponse> {
    return this.requestJson<GatewayResponse>('network/gateway', { query: options });
  }

  async getNetworkRoutes(options?: DetailedNetworkOptions): Promise<RoutesResponse> {
    return this.requestJson<RoutesResponse>('network/routes', { query: options });
  }

  async getNetworkInterfaces(options?: DetailedNetworkOptions): Promise<InterfacesResponse> {
    return this.requestJson<InterfacesResponse>('network/interfaces', { query: options });
  }

  async exportTeleporter(): Promise<ArrayBuffer> {
    return this.requestArrayBuffer('teleporter');
  }

  async importTeleporter(archive: Blob | ArrayBuffer | Uint8Array, selection?: TeleporterImportSelection): Promise<TeleporterImportResponse> {
    const form = new FormData();
    const binary =
      archive instanceof Blob
        ? archive
        : archive instanceof Uint8Array
          ? Uint8Array.from(archive)
          : new Uint8Array(archive);
    const file = binary instanceof Blob ? binary : new Blob([binary], { type: 'application/zip' });
    form.set('file', file, 'teleporter.zip');
    if (selection) {
      form.set('import', JSON.stringify(selection));
    }

    return this.requestJson<TeleporterImportResponse>('teleporter', {
      method: 'POST',
      body: form,
    });
  }

  async runGravity(options?: GravityOptions): Promise<string> {
    return this.requestText('action/gravity', {
      method: 'POST',
      query: options,
    });
  }

  async restartDns(): Promise<SuccessResponse> {
    return this.requestJson<SuccessResponse>('action/restartdns', { method: 'POST' });
  }

  async flushLogs(): Promise<SuccessResponse> {
    return this.requestJson<SuccessResponse>('action/flush/logs', { method: 'POST' });
  }

  async flushArp(): Promise<SuccessResponse> {
    return this.requestJson<SuccessResponse>('action/flush/arp', { method: 'POST' });
  }

  async flushNetwork(): Promise<SuccessResponse> {
    return this.requestJson<SuccessResponse>('action/flush/network', { method: 'POST' });
  }

  async getDhcpLeases(): Promise<DhcpLeasesResponse> {
    return this.requestJson<DhcpLeasesResponse>('dhcp/leases');
  }

  async deleteDhcpLease(ip: string): Promise<void> {
    await this.requestVoid(`dhcp/leases/${encodeSegment(ip)}`, { method: 'DELETE' });
  }

  async getSearch(domain: string, options?: SearchOptions): Promise<SearchResponse> {
    return this.requestJson<SearchResponse>(`search/${encodeSegment(domain)}`, { query: options });
  }

  async getDocs(): Promise<string> {
    return this.requestText('docs', { auth: 'none' });
  }

  async getPadd(): Promise<PaddResponse> {
    return this.requestJson<PaddResponse>('padd');
  }
}
