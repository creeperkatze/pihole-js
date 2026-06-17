import { ActionsApi } from './action.js';
import { AuthApi } from './auth.js';
import { ClientsApi } from './clients.js';
import { ConfigApi } from './config.js';
import { DhcpApi } from './dhcp.js';
import { DnsApi } from './dns.js';
import { DocsApi } from './docs.js';
import { DomainsApi } from './domains.js';
import { GroupsApi } from './groups.js';
import { HistoryApi } from './history.js';
import { InfoApi } from './info.js';
import { ListsApi } from './lists.js';
import { LogsApi } from './logs.js';
import { NetworkApi } from './network.js';
import { PaddApi } from './padd.js';
import { QueriesApi } from './queries.js';
import { StatsApi } from './stats.js';
import { TeleporterApi } from './teleporter.js';
import { PiHoleClientCore } from './core.js';
import type { EndpointsResponse, PiHoleClientOptions } from '../types/index.js';

/**
 * Main Pi-hole API client.
 *
 * Create one instance and use its resource namespaces to access the Pi-hole API.
 */
export class PiHoleClient {
  readonly auth: AuthApi;
  readonly stats: StatsApi;
  readonly history: HistoryApi;
  readonly queries: QueriesApi;
  readonly dns: DnsApi;
  readonly domains: DomainsApi;
  readonly groups: GroupsApi;
  readonly clients: ClientsApi;
  readonly lists: ListsApi;
  readonly info: InfoApi;
  readonly logs: LogsApi;
  readonly config: ConfigApi;
  readonly network: NetworkApi;
  readonly teleporter: TeleporterApi;
  readonly actions: ActionsApi;
  readonly dhcp: DhcpApi;
  readonly docs: DocsApi;
  readonly padd: PaddApi;

  private readonly core: PiHoleClientCore;

  constructor(options: PiHoleClientOptions) {
    this.core = new PiHoleClientCore(options);

    this.auth = new AuthApi(this.core);
    this.stats = new StatsApi(this.core);
    this.history = new HistoryApi(this.core);
    this.queries = new QueriesApi(this.core);
    this.dns = new DnsApi(this.core);
    this.domains = new DomainsApi(this.core);
    this.groups = new GroupsApi(this.core);
    this.clients = new ClientsApi(this.core);
    this.lists = new ListsApi(this.core);
    this.info = new InfoApi(this.core);
    this.logs = new LogsApi(this.core);
    this.config = new ConfigApi(this.core);
    this.network = new NetworkApi(this.core);
    this.teleporter = new TeleporterApi(this.core);
    this.actions = new ActionsApi(this.core);
    this.dhcp = new DhcpApi(this.core);
    this.docs = new DocsApi(this.core);
    this.padd = new PaddApi(this.core);
  }

  async getEndpoints(): Promise<EndpointsResponse> {
    return this.core.requestJson<EndpointsResponse>('endpoints');
  }
}
