# pihole-js

A framework-agnostic JavaScript client for the Pi-hole v6 API.

![NPM Version](https://img.shields.io/npm/v/pihole-js?labelColor=0d143c)
![NPM Downloads](https://img.shields.io/npm/dt/pihole-js?labelColor=0d143c)
![Codecov](https://img.shields.io/codecov/c/github/creeperkatze/pihole-js?labelColor=0d143c)
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

const summary = await client.metrics.getSummary();
const blocking = await client.dns.getBlocking();

console.log(summary);
console.log(blocking);
```

## 📚 Documentation

The docs can be found [here](https://pihole-js.creeperkatze.dev).

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
- `client.auth.check()`
- `client.auth.login(credentials?)`
- `client.auth.logout()`
- `client.auth.getSessions()`

Metrics:
- `client.metrics.getSummary()`
- `client.metrics.getTopDomains()`
- `client.metrics.getDatabaseTopDomains(options)`
- `client.metrics.getTopClients()`
- `client.metrics.getQueries()`
- `client.metrics.getHistory()`
- `client.dns.getBlocking()`
- `client.dns.setBlocking(blocking, timer?)`

Management:
- `client.domains.list()`
- `client.domains.create(type, kind, payload)`
- `client.domains.replace(type, kind, domain, payload)`
- `client.domains.delete(type, kind, domain)`
- `client.groups.list()`
- `client.clients.list()`
- `client.lists.list()`

System:
- `client.config.get()`
- `client.config.patch(config, options?)`
- `client.network.getDevices(options?)`
- `client.network.getGateway(options?)`
- `client.teleporter.export()`
- `client.teleporter.import(archive, selection?)`
- `client.actions.runGravity(options?)`
- `client.actions.restartDns()`
- `client.actions.flushLogs()`
- `client.dhcp.getLeases()`
- `client.search.lookup(domain, options?)`
- `client.padd.getSummary()`

## 🔐 Authentication

If you provide a `password`, the client will authenticate automatically and reuse the returned Pi-hole session.

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
});

await client.metrics.getSummary();
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

## ⚠️ Error Handling

All request, authentication, timeout, and API errors are thrown as `PiHoleError`.

```ts
import PiHoleClient, { PiHoleError } from 'pihole-js';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
});

try {
  await client.metrics.getSummary();
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
