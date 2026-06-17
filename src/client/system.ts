import { PiHoleClientCore } from './core.js';
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
  RoutesResponse,
  SearchOptions,
  SearchResponse,
  SuccessResponse,
  TeleporterImportResponse,
  TeleporterImportSelection,
} from '../types/index.js';
import { encodeSegment } from '../utils/domain.js';

export class InfoApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getClient(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/client', { auth: 'none' });
  }

  async getSystem(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/system');
  }

  async getDatabase(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/database');
  }

  async getFtl(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/ftl');
  }

  async getHost(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/host');
  }

  async getSensors(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/sensors');
  }

  async getVersion(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/version');
  }

  async getMessages(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/messages');
  }

  async deleteMessages(messageIds: string | number | Array<string | number>): Promise<void> {
    const id = Array.isArray(messageIds) ? messageIds.join(',') : String(messageIds);
    await this.core.requestVoid(`info/messages/${encodeSegment(id)}`, { method: 'DELETE' });
  }

  async getMessagesCount(): Promise<CountResponse> {
    return this.core.requestJson<CountResponse>('info/messages/count');
  }

  async getMetrics(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/metrics');
  }

  async getLogin(): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>('info/login', { auth: 'none' });
  }
}

export class LogsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getDnsmasqLog(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/dnsmasq', { query: options });
  }

  async getFtlLog(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/ftl', { query: options });
  }

  async getWebserverLog(options?: LogsOptions): Promise<LogsResponse> {
    return this.core.requestJson<LogsResponse>('logs/webserver', { query: options });
  }
}

export class EndpointsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async list(): Promise<EndpointsResponse> {
    return this.core.requestJson<EndpointsResponse>('endpoints');
  }
}

export class ConfigApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async get(options?: ConfigQueryOptions): Promise<ConfigResponse> {
    return this.core.requestJson<ConfigResponse>('config', { query: options });
  }

  async patch(config: ConfigResponse['config'], options?: ConfigMutationOptions): Promise<ConfigResponse> {
    return this.core.requestJson<ConfigResponse>('config', {
      method: 'PATCH',
      query: options,
      body: { config },
    });
  }

  async getElement(element: string, options?: ConfigQueryOptions): Promise<GenericApiResponse> {
    return this.core.requestJson<GenericApiResponse>(`config/${element.replace(/^\/+/, '')}`, { query: options });
  }

  async addArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.core.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'PUT',
      query: options,
    });
  }

  async deleteArrayItem(element: string, value: string, options?: ConfigMutationOptions): Promise<void> {
    await this.core.requestVoid(`config/${element.replace(/^\/+/, '')}/${encodeSegment(value)}`, {
      method: 'DELETE',
      query: options,
    });
  }
}

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

export class TeleporterApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async export(): Promise<ArrayBuffer> {
    return this.core.requestArrayBuffer('teleporter');
  }

  async import(archive: Blob | ArrayBuffer | Uint8Array, selection?: TeleporterImportSelection): Promise<TeleporterImportResponse> {
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

    return this.core.requestJson<TeleporterImportResponse>('teleporter', {
      method: 'POST',
      body: form,
    });
  }
}

export class ActionsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async runGravity(options?: GravityOptions): Promise<string> {
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

export class DhcpApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getLeases(): Promise<DhcpLeasesResponse> {
    return this.core.requestJson<DhcpLeasesResponse>('dhcp/leases');
  }

  async deleteLease(ip: string): Promise<void> {
    await this.core.requestVoid(`dhcp/leases/${encodeSegment(ip)}`, { method: 'DELETE' });
  }
}

export class SearchApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async lookup(domain: string, options?: SearchOptions): Promise<SearchResponse> {
    return this.core.requestJson<SearchResponse>(`search/${encodeSegment(domain)}`, { query: options });
  }
}

export class DocsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getHtml(): Promise<string> {
    return this.core.requestText('docs', { auth: 'none' });
  }
}

export class PaddApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getSummary(): Promise<PaddResponse> {
    return this.core.requestJson<PaddResponse>('padd');
  }
}
