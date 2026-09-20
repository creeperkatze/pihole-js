# Error Handling

All request failures (network errors, timeouts, and API errors) throw a `PiHoleError`.

## Catching errors

```ts
import PiHoleClient, { PiHoleError } from 'pihole-js';

try {
  await client.dns.enable();
} catch (err) {
  if (err instanceof PiHoleError) {
    console.error(err.status, err.code, err.message);
  }
}
```

## PiHoleError properties

| Property | Type | Description |
|---|---|---|
| `message` | `string` | Human-readable description |
| `status` | `number` | HTTP status code, or `0` for network/timeout errors |
| `code` | `string \| undefined` | Pi-hole API error code if available |
| `body` | `unknown` | Raw response body if available |
| `response` | `Response \| undefined` | The raw fetch `Response` if available |

## Common status codes

- `401` - authentication failed or session expired (the client retries once automatically)
- `404` - the requested resource does not exist
- `0` - the request never reached the server (network error, timeout, DNS failure)

## Distinguishing error types

```ts
try {
  await client.domains.deny('ads.example.com');
} catch (err) {
  if (!(err instanceof PiHoleError)) throw err; // re-throw unexpected errors

  if (err.status === 0) {
    // Network or timeout - Pi-hole may be unreachable
  } else if (err.status === 401) {
    // Auth failure - check your password
  } else {
    // API error - inspect err.code and err.body for details
  }
}
```
