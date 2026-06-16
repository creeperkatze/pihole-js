import type { DomainLookupOptions } from '../types/index.js';

export function domainRegex(domain: string): string {
  const escaped = domain.replace(/\./g, '\\.');
  return `(^|\\.)(${escaped})$`;
}

export function encodeSegment(value: string | number): string {
  return encodeURIComponent(String(value));
}

export function domainsPath(options?: DomainLookupOptions): string {
  if (!options) return 'domains';
  if (options.path) return `domains/${options.path.replace(/^\/+/, '')}`;

  const segments = ['domains'];
  if (options.type) segments.push(options.type);
  if (options.kind) segments.push(options.kind);
  if (options.domain) segments.push(encodeSegment(options.domain));
  return segments.join('/');
}
