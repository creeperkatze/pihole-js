import { PiHoleClientCore } from './core.js';

/** Fetches the Pi-hole API documentation page. */
export class DocsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Returns the API documentation as an HTML string. */
  async getHtml(): Promise<string> {
    return this.core.requestText('docs', { auth: 'none' });
  }
}
