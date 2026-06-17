import { PiHoleClientCore } from './core.js';
import type { TeleporterImportResponse, TeleporterImportSelection } from '../types/index.js';

/** Exports and imports Pi-hole configuration archives. */
export class TeleporterApi {
  constructor(private readonly core: PiHoleClientCore) {}

  /** Downloads a full configuration backup as a ZIP archive. */
  async export(): Promise<ArrayBuffer> {
    return this.core.requestArrayBuffer('teleporter');
  }

  /** Restores from a ZIP backup, optionally limiting which sections are imported. */
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
