# pihole-js

A framework-agnostic JavaScript client for the Pi-hole API.

[![NPM Version](https://img.shields.io/npm/v/pihole-js)](https://www.npmjs.com/package/pihole-js)
[![NPM Downloads](https://img.shields.io/npm/dt/pihole-js)](https://www.npmjs.com/package/pihole-js)
![GitHub Branch Check Runs](https://img.shields.io/github/check-runs/creeperkatze/pihole-js/main)
![Codecov](https://img.shields.io/codecov/c/github/creeperkatze/pihole-js)
![GitHub Issues](https://img.shields.io/github/issues/creeperkatze/pihole-js)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/creeperkatze/pihole-js)
![GitHub Repo stars](https://img.shields.io/github/stars/creeperkatze/pihole-js?style=flat)

[📚 Docs](https://pihole-js.creeperkatze.dev/) •
[🚀 Getting Started](https://pihole-js.creeperkatze.dev/guide/getting-started) •
[📖 API Reference](https://pihole-js.creeperkatze.dev/api/) •
[📝 Changelog](https://github.com/creeperkatze/pihole-js/releases)

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

const summary = await client.stats.getSummary();
const blocking = await client.dns.getStatus();

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

Auth:
- `client.auth.check()`
- `client.auth.login(credentials?)`
- `client.auth.logout()`
- `client.auth.getSessions()`

Stats:
- `client.stats.getSummary()`
- `client.stats.getTopDomains(options?)`
- `client.stats.getDatabaseTopDomains(options)`
- `client.stats.getTopClients(options?)`
- `client.stats.getRecentBlocked(count?)`
- `client.stats.getDatabaseSummary(options)`

History:
- `client.history.get()`
- `client.history.getClients(options?)`
- `client.history.getDatabase(options)`
- `client.history.getDatabaseClients(options)`

Queries:
- `client.queries.list(options?)`
- `client.queries.getSuggestions()`

DNS:
- `client.dns.getStatus()`
- `client.dns.setBlocking(blocking, timer?)`
- `client.dns.enable()`
- `client.dns.disable(seconds?)`

Domains:
- `client.domains.list()`
- `client.domains.create(type, kind, payload)`
- `client.domains.update(type, kind, domain, payload)`
- `client.domains.delete(type, kind, domain)`
- `client.domains.allow(domain, comment?)`
- `client.domains.unallow(domain)`
- `client.domains.deny(domain, comment?)`
- `client.domains.undeny(domain)`
- `client.domains.allowRegex(pattern, comment?)`
- `client.domains.unallowRegex(pattern)`
- `client.domains.denyRegex(pattern, comment?)`
- `client.domains.undenyRegex(pattern)`
- `client.domains.search(domain, options?)`

Groups:
- `client.groups.list()`
- `client.groups.get(name)`
- `client.groups.create(payload)`
- `client.groups.update(name, payload)`
- `client.groups.delete(name)`

Clients:
- `client.clients.list()`
- `client.clients.get(client)`
- `client.clients.create(payload)`
- `client.clients.update(client, payload)`
- `client.clients.delete(client)`
- `client.clients.getSuggestions()`

Lists:
- `client.lists.list(options?)`
- `client.lists.get(address, options?)`
- `client.lists.create(type, payload)`
- `client.lists.update(address, payload)`
- `client.lists.delete(address, type)`

Config:
- `client.config.get(options?)`
- `client.config.patch(config, options?)`
- `client.config.getSection(element, options?)`
- `client.config.addArrayItem(element, value, options?)`
- `client.config.removeArrayItem(element, value, options?)`

Network:
- `client.network.getDevices(options?)`
- `client.network.deleteDevice(deviceId)`
- `client.network.getGateway(options?)`
- `client.network.getRoutes(options?)`
- `client.network.getInterfaces(options?)`

Info:
- `client.info.getSystem()`
- `client.info.getVersion()`
- `client.info.getMessages()`
- `client.info.getMessagesCount()`
- `client.info.deleteMessage(id)`

Logs:
- `client.logs.getDnsmasq(options?)`
- `client.logs.getFtl(options?)`
- `client.logs.getWebserver(options?)`

Teleporter:
- `client.teleporter.export()`
- `client.teleporter.import(archive, selection?)`

Actions:
- `client.actions.updateGravity(options?)`
- `client.actions.restartDns()`
- `client.actions.flushLogs()`
- `client.actions.flushArp()`
- `client.actions.flushNetwork()`

DHCP:
- `client.dhcp.getLeases()`
- `client.dhcp.deleteLease(ip)`

Docs:
- `client.docs.getHtml()`

PADD:
- `client.padd.getSummary()`

## 🔐 Authentication

If you provide a `password`, the client will authenticate automatically and reuse the returned Pi-hole session.

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
});

await client.stats.getSummary();
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
  await client.stats.getSummary();
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
pnpm build

pnpm test
```

## 🤝 Contributing

Contributions are always welcome!

Please ensure you run `pnpm lint:fix` before opening a pull request.

## 📜 License

AGPL-3.0