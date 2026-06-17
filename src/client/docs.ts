import { PiHoleClientCore } from './core.js';

export class DocsApi {
  constructor(private readonly core: PiHoleClientCore) {}

  async getHtml(): Promise<string> {
    return this.core.requestText('docs', { auth: 'none' });
  }
}
