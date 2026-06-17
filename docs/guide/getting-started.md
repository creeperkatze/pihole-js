# Getting Started

## Installation

::: code-group

```sh [pnpm]
pnpm add pihole-js
```

```sh [npm]
npm install pihole-js
```

```sh [yarn]
yarn add pihole-js
```

```sh [bun]
bun add pihole-js
```

:::

## Create a client

```ts
import PiHoleClient from 'pihole-js';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'your-api-password',
  userAgent: 'my-app/1.0',
});
```

## Fetch some data

```ts
const summary = await client.stats.getSummary();
const status = await client.dns.getStatus();
```

## Common options

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  timeoutMs: 10_000,
  userAgent: 'my-app/1.0',
});
```

## Where to go next

- See [Authentication](/guide/authentication) for how session handling works
- See [Sessions and Fetch](/guide/sessions-and-fetch) for custom session stores and runtime integration
- See [API Reference](/api/) for the generated public API docs
