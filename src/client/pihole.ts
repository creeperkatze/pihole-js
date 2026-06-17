import { AuthApi } from './auth.js';
import { PiHoleClientCore } from './core.js';
import { ClientsApi, DomainsApi, GroupsApi, ListsApi } from './management.js';
import { DnsApi, MetricsApi } from './metrics.js';
import {
  ActionsApi,
  ConfigApi,
  DhcpApi,
  DocsApi,
  EndpointsApi,
  InfoApi,
  LogsApi,
  NetworkApi,
  PaddApi,
  SearchApi,
  TeleporterApi,
} from './system.js';
import type { PiHoleClientOptions } from '../types/index.js';

/**
 * Main Pi-hole API client.
 *
 * Create one instance and use its resource namespaces to access the Pi-hole API.
 */
export class PiHoleClient {
  readonly auth: AuthApi;
  readonly metrics: MetricsApi;
  readonly dns: DnsApi;
  readonly domains: DomainsApi;
  readonly groups: GroupsApi;
  readonly clients: ClientsApi;
  readonly lists: ListsApi;
  readonly info: InfoApi;
  readonly logs: LogsApi;
  readonly endpoints: EndpointsApi;
  readonly config: ConfigApi;
  readonly network: NetworkApi;
  readonly teleporter: TeleporterApi;
  readonly actions: ActionsApi;
  readonly dhcp: DhcpApi;
  readonly search: SearchApi;
  readonly docs: DocsApi;
  readonly padd: PaddApi;

  constructor(options: PiHoleClientOptions) {
    const core = new PiHoleClientCore(options);

    this.auth = new AuthApi(core);
    this.metrics = new MetricsApi(core);
    this.dns = new DnsApi(core);
    this.domains = new DomainsApi(core);
    this.groups = new GroupsApi(core);
    this.clients = new ClientsApi(core);
    this.lists = new ListsApi(core);
    this.info = new InfoApi(core);
    this.logs = new LogsApi(core);
    this.endpoints = new EndpointsApi(core);
    this.config = new ConfigApi(core);
    this.network = new NetworkApi(core);
    this.teleporter = new TeleporterApi(core);
    this.actions = new ActionsApi(core);
    this.dhcp = new DhcpApi(core);
    this.search = new SearchApi(core);
    this.docs = new DocsApi(core);
    this.padd = new PaddApi(core);
  }
}
