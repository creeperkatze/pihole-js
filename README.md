# pihole-js

A framework-agnostic JavaScript client for the Pi-hole v6 API.

![GitHub Branch Check Runs](https://img.shields.io/github/check-runs/creeperkatze/pihole-js/main?labelColor=0d143c)
![GitHub Issues](https://img.shields.io/github/issues/creeperkatze/pihole-js?labelColor=0d143c)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/creeperkatze/pihole-js?labelColor=0d143c)
![GitHub Repo stars](https://img.shields.io/github/stars/creeperkatze/pihole-js?style=flat&labelColor=0d143c)

## 📦 Installation

```sh
npm install pihole-js
pnpm add pihole-js
yarn add pihole-js
bun add pihole-js
```

## 🚀 Usage

```ts
import PiHoleClient from 'pihole-js';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'your-api-password',
  userAgent: 'my-app/1.0',
});

const summary = await client.getStatsSummary();
const blocking = await client.getBlocking();

console.log(summary);
console.log(blocking);
```

## 📖 API

### `new PiHoleClient(options)`

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  timeoutMs: 10_000,
  userAgent: 'my-app/1.0',
});
```

### Options

```ts
interface PiHoleClientOptions {
  baseUrl: string;
  password?: string;
  timeoutMs?: number;
  userAgent?: string;
  fetch?: typeof globalThis.fetch;
  sessionStore?: SessionStore;
}
```

### Selected Methods

Authentication:
- `client.checkAuth()`
- `client.login(credentials?)`
- `client.logout()`
- `client.getSessions()`

Metrics:
- `client.getStatsSummary()`
- `client.getStatsTopDomains()`
- `client.getStatsTopClients()`
- `client.getQueries()`
- `client.getHistory()`
- `client.getBlocking()`
- `client.updateBlocking(blocking, timer?)`

Management:
- `client.getDomains()`
- `client.createDomain(type, kind, payload)`
- `client.replaceDomain(type, kind, domain, payload)`
- `client.deleteDomain(type, kind, domain)`
- `client.getGroups()`
- `client.getClients()`
- `client.getLists()`

System:
- `client.getConfig()`
- `client.patchConfig(config, options?)`
- `client.getNetworkDevices(options?)`
- `client.getNetworkGateway(options?)`
- `client.exportTeleporter()`
- `client.importTeleporter(archive, selection?)`
- `client.runGravity(options?)`
- `client.restartDns()`
- `client.flushLogs()`
- `client.getDhcpLeases()`
- `client.getSearch(domain, options?)`
- `client.getPadd()`

## 🔐 Authentication

If you provide a `password`, the client will authenticate automatically and reuse the returned Pi-hole session.

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
});

await client.getStatsSummary();
```

For passwordless installs, omit the password:

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
});
```

## 🗂️ Session Stores

By default, each client instance keeps session data in memory.

```ts
import PiHoleClient, { MemorySessionStore } from 'pihole-js';

const sessionStore = new MemorySessionStore();

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  sessionStore,
});
```

If you want to share sessions across client instances, provide your own store implementation that matches the `SessionStore` interface.

## 🌐 Custom Fetch

You can inject your own `fetch` implementation.

```ts
import PiHoleClient from 'pihole-js';
import fetch from 'node-fetch';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  fetch,
});
```

## 📚 Documentation

Project documentation now lives in `docs/`:

- guides are written with VitePress
- API reference pages are generated with TypeDoc

Useful commands:

```sh
pnpm docs:api
pnpm docs:dev
pnpm docs:build
```

The docs site can also be built into a container image. The provided `Dockerfile.docs` is set up for subpath hosting such as `docs.creeperkatze.dev/pihole-js`.

## ⚠️ Error Handling

All request, authentication, timeout, and API errors are thrown as `PiHoleError`.

```ts
import PiHoleClient, { PiHoleError } from 'pihole-js';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
});

try {
  await client.getStatsSummary();
} catch (error) {
  if (error instanceof PiHoleError) {
    console.error(error.status);
    console.error(error.code);
    console.error(error.message);
  }
}
```

## 👨‍💻 Development

```sh
pnpm test
pnpm test:coverage
pnpm build
```

## 📜 License

AGPL-3.0-only
