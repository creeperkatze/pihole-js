[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / SessionStore

# Interface: SessionStore

Defined in: [types/base.ts:61](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L61)

Storage adapter for persisting Pi-hole session IDs across requests or client instances.

## Methods

### delete()

> **delete**(`baseUrl`): `Promise`\<`void`\>

Defined in: [types/base.ts:64](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L64)

#### Parameters

##### baseUrl

`string`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`baseUrl`): `Promise`\<[`SessionEntry`](SessionEntry.md) \| `null`\>

Defined in: [types/base.ts:62](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L62)

#### Parameters

##### baseUrl

`string`

#### Returns

`Promise`\<[`SessionEntry`](SessionEntry.md) \| `null`\>

***

### set()

> **set**(`baseUrl`, `entry`): `Promise`\<`void`\>

Defined in: [types/base.ts:63](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L63)

#### Parameters

##### baseUrl

`string`

##### entry

[`SessionEntry`](SessionEntry.md)

#### Returns

`Promise`\<`void`\>
