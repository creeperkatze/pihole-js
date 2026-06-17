# Authentication

Pi-hole sessions are automatically handled for you by default.

## Password-protected installs

Provide the Pi-hole web password when creating the client:

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
  password: 'secret',
});
```

When you make the first authenticated request, the client logs in, stores the returned session ID, and reuses it on later requests.

## Passwordless installs

If your Pi-hole instance does not require a password, omit the `password` option:

```ts
const client = new PiHoleClient({
  baseUrl: 'http://pi.hole',
});
```

## Session lifecycle

The client will:

- reuse a valid cached session
- validate or refresh expired sessions when needed
- retry once when a session becomes invalid and Pi-hole returns `401`

## Related methods

- `client.auth.check()`
- `client.auth.login(credentials?)`
- `client.auth.logout()`
- `client.auth.getSessions()`
