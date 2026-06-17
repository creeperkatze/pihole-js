# Domain Management

`client.domains` manages Pi-hole's allow and deny lists.

## Allow and deny

```ts
// Add to allowlist / denylist
await client.domains.allow('safe.example.com');
await client.domains.deny('ads.example.com');

// Remove from allowlist / denylist
await client.domains.unallow('safe.example.com');
await client.domains.undeny('ads.example.com');
```

An optional comment can be added to any entry:

```ts
await client.domains.deny('tracker.example.com', 'known tracker');
```

## Regex rules

```ts
await client.domains.allowRegex('^safe\\..*\\.com$');
await client.domains.denyRegex('^ads?\\..*');
```

## Read the lists

```ts
const allowlist = await client.domains.getAllowlist();
const denylist  = await client.domains.getDenylist();
```

## Search

Check whether a domain is covered by any list or regex rule:

```ts
const result = await client.domains.search('ads.example.com');
// result.search.domains - matched exact/regex domain entries
// result.search.gravity - matched gravity list entries
```

Partial matching and debug output are available via options:

```ts
const result = await client.domains.search('example', { partial: true });
```

## Batch delete

Remove multiple entries in a single request:

```ts
await client.domains.batchDelete([
  { item: 'ads.example.com', type: 'deny', kind: 'exact' },
  { item: '^ads?\\..*',      type: 'deny', kind: 'regex' },
]);
```

## Generic CRUD

The convenience methods above cover most cases. For full control over type and kind:

```ts
// type: 'allow' | 'deny'
// kind: 'exact' | 'regex'

await client.domains.create('deny', 'exact', { domain: 'ads.example.com', comment: 'manual' });
await client.domains.update('deny', 'exact', 'ads.example.com', { enabled: false });
await client.domains.delete('deny', 'exact', 'ads.example.com');
```
