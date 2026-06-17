import { SystemClient } from './system.js';

/**
 * Main Pi-hole API client.
 *
 * Create one instance and use it to access authentication, metrics, management, and system endpoints.
 */
export class PiHoleClient extends SystemClient {}
