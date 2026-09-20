# Sessions and Fetch

## Session stores

By default, each client instance uses an in-memory session store.

```ts
import PiHoleClient, { MemorySessionStore } from 'pihole-js';

const sessionStore = new MemorySessionStore();

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  sessionStore,
});
```

Provide your own `sessionStore` if you want to share sessions across multiple client instances.

## Custom fetch

You can inject a custom `fetch` implementation for non-standard runtimes.

```ts
import PiHoleClient from 'pihole-js';
import fetch from 'node-fetch';

const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
  fetch,
});
```

## User-Agent

You can set a custom `User-Agent` once at client creation time:

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  userAgent: 'my-dashboard/1.0',
});
```

The configured value is applied to every request from that client.
