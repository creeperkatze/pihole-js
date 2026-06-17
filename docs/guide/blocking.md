# DNS Blocking

Control Pi-hole's blocking state with `client.dns`.

## Check the current status

```ts
const status = await client.dns.getStatus();
// { blocking: 'enabled' | 'disabled', timer: number | null }
```

`timer` is the number of seconds remaining if blocking was disabled temporarily, or `null` if there is no timer running.

## Enable and disable

```ts
await client.dns.enable();
await client.dns.disable();
```

## Disable for a fixed time

Pass a number of seconds to re-enable blocking automatically after that duration:

```ts
// Disable for 5 minutes, then re-enable automatically
await client.dns.disable(300);
```

## Full control

`setBlocking` is the underlying method used by `enable` and `disable`:

```ts
await client.dns.setBlocking(false, 600); // disable for 10 minutes
await client.dns.setBlocking(true);        // enable (clears any timer)
await client.dns.setBlocking(false, null); // disable indefinitely
```
