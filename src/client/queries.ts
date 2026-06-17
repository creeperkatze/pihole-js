import { PiHoleClientCore } from './core.js';
import type {
  QueriesResponse,
  QueryListOptions,
  QuerySuggestionsResponse,
} from '../types/index.js';

/** Accesses the DNS query log. */
export class QueriesApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns a paginated list of DNS queries with optional filters. */
  async list(options?: QueryListOptions): Promise<QueriesResponse> {
    return this.core.requestJson<QueriesResponse>('queries', { query: options });
  }

  /** Returns autocomplete suggestions for query log filter fields. */
  async getSuggestions(): Promise<QuerySuggestionsResponse> {
    return this.core.requestJson<QuerySuggestionsResponse>('queries/suggestions');
  }
}
