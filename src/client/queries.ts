import { PiHoleClientCore } from './core.js';
import type {
  QueriesResponse,
  QueryListOptions,
  QuerySuggestionsResponse,
} from '../types/index.js';

export class QueriesApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async list(options?: QueryListOptions): Promise<QueriesResponse> {
    return this.core.requestJson<QueriesResponse>('queries', { query: options });
  }

  async getSuggestions(): Promise<QuerySuggestionsResponse> {
    return this.core.requestJson<QuerySuggestionsResponse>('queries/suggestions');
  }
}
