# pihole-js

A framework-agnostic JavaScript API client for the Pi-hole v6 API. Zero runtime dependencies, requires Node.js 18+.

## Installation

```sh
npm install pihole-js
pnpm add pihole-js
```

## Usage

```ts
import PiHoleClient from 'pihole-js';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'your-api-password',
});

const stats = await client.getStatsSummary();
const blocking = await client.getBlocking();
```

## Features

- Built-in session authentication for password-protected and passwordless installs
- Configurable request timeout
- Pluggable `fetch` implementation
- Pluggable session store for persisting session IDs across client instances
- First-class methods covering the Pi-hole v6 endpoints shipped in [`/spec`](./spec)

## API

### `new PiHoleClient(options)`

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  timeoutMs: 10_000,
});
```

### Selected endpoint methods

- `client.checkAuth()`, `client.login()`, `client.logout()`
- `client.getStatsSummary()`, `client.getBlocking()`, `client.getQueries()`, `client.getHistory()`
- `client.getDomains()`, `client.createDomain()`, `client.replaceDomain()`, `client.deleteDomain()`
- `client.getGroups()`, `client.getClients()`, `client.getLists()`
- `client.getConfig()`, `client.patchConfig()`
- `client.getNetworkDevices()`, `client.getNetworkGateway()`
- `client.exportTeleporter()`, `client.importTeleporter()`
- `client.runGravity()`, `client.restartDns()`, `client.flushLogs()`
- `client.getDhcpLeases()`, `client.getSearch()`, `client.getPadd()`

## Session stores

By default, each client instance keeps session data in memory. To share sessions across clients, provide a custom store:

```ts
import PiHoleClient, { MemorySessionStore } from 'pihole-js';

const store = new MemorySessionStore();
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  sessionStore: store,
});
```

## Error handling

All API methods throw `PiHoleError` on HTTP errors, API errors, authentication failures, and timeouts.

```ts
import PiHoleClient, { PiHoleError } from 'pihole-js';

try {
  await client.getStatsSummary();
} catch (error) {
  if (error instanceof PiHoleError) {
    console.error(error.status, error.message);
  }
}
```

## License

AGPL-3.0-only
