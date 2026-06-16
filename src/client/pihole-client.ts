import { SystemClient } from './system-client.js';
import { domainRegex } from '../utils/domain.js';
import type {
  BlockingStatus,
  DomainKind,
  DomainSearchResult,
  DomainType,
  PiholeGroup,
  PiholeList,
  PiholeSummary,
  PiHoleClientOptions,
  SearchOptions,
} from '../types/index.js';

export class PiHoleClient extends SystemClient {
  constructor(options: PiHoleClientOptions) {
    super(options);
  }

  async getSummary(): Promise<PiholeSummary> {
    const [stats, blocking, historyRes, groupsRes, listsRes, paddRes] = await Promise.all([
      this.getStatsSummary(),
      this.getBlocking(),
      this.getHistory().catch(() => ({ history: [] })),
      this.getGroups().catch(() => ({ groups: [] })),
      this.getLists().catch(() => ({ lists: [] })),
      this.getPadd().catch(() => null),
    ]);

    return {
      queries: {
        total: stats.queries.total,
        blocked: stats.queries.blocked,
        percent_blocked: stats.queries.percent_blocked,
        unique_domains: stats.queries.unique_domains,
        cached: stats.queries.cached,
        forwarded: stats.queries.forwarded,
        types: stats.queries.types,
      },
      clients: stats.clients,
      blocking,
      history: historyRes.history,
      groups: groupsRes.groups,
      lists: listsRes.lists,
      diagnosis: paddRes
        ? {
            cpu: paddRes['%cpu'] ?? 0,
            memory: paddRes['%mem'] ?? 0,
            temperature: paddRes.sensors?.cpu_temp ?? null,
            tempUnit: paddRes.sensors?.unit ?? 'C',
            uptime: paddRes.system?.uptime ?? 0,
          }
        : null,
    };
  }

  async searchDomain(domain: string, options?: SearchOptions): Promise<DomainSearchResult> {
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('domain must be a non-empty string');
    }

    const result = await this.getSearch(domain, { partial: false, ...options });
    return result.search;
  }

  async blockDomain(domain: string): Promise<void> {
    await this.createDomain('deny', 'regex', {
      domain: domainRegex(domain),
      comment: '',
      groups: [0],
      enabled: true,
    });
  }

  async allowlistDomain(domain: string): Promise<void> {
    await this.createDomain('allow', 'regex', {
      domain: domainRegex(domain),
      comment: '',
      groups: [0],
      enabled: true,
    });
  }

  async deleteDomainEntry(type: DomainType, kind: DomainKind, domain: string): Promise<void> {
    await this.deleteDomain(type, kind, domain);
  }

  async setGroupEnabled(group: PiholeGroup, enabled: boolean): Promise<void> {
    await this.replaceGroup(group.name, {
      name: group.name,
      comment: group.comment,
      enabled,
    });
  }

  async setListEnabled(list: PiholeList, enabled: boolean): Promise<void> {
    await this.replaceList(list.address, {
      type: list.type,
      comment: list.comment,
      groups: list.groups,
      enabled,
    });
  }

  async setBlocking(enabled: boolean, seconds?: number): Promise<BlockingStatus> {
    return this.updateBlocking(enabled, seconds ?? null);
  }
}
