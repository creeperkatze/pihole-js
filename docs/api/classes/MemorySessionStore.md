[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / MemorySessionStore

# Class: MemorySessionStore

Defined in: [session/memory.ts:8](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/session/memory.ts#L8)

In-memory implementation of [SessionStore](../interfaces/SessionStore.md).

Each client instance gets its own store by default unless one is provided explicitly.

## Implements

- [`SessionStore`](../interfaces/SessionStore.md)

## Constructors

### Constructor

> **new MemorySessionStore**(): `MemorySessionStore`

#### Returns

`MemorySessionStore`

## Methods

### delete()

> **delete**(`baseUrl`): `Promise`\<`void`\>

Defined in: [session/memory.ts:19](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/session/memory.ts#L19)

#### Parameters

##### baseUrl

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SessionStore`](../interfaces/SessionStore.md).[`delete`](../interfaces/SessionStore.md#delete)

***

### get()

> **get**(`baseUrl`): `Promise`\<[`SessionEntry`](../interfaces/SessionEntry.md) \| `null`\>

Defined in: [session/memory.ts:11](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/session/memory.ts#L11)

#### Parameters

##### baseUrl

`string`

#### Returns

`Promise`\<[`SessionEntry`](../interfaces/SessionEntry.md) \| `null`\>

#### Implementation of

[`SessionStore`](../interfaces/SessionStore.md).[`get`](../interfaces/SessionStore.md#get)

***

### set()

> **set**(`baseUrl`, `entry`): `Promise`\<`void`\>

Defined in: [session/memory.ts:15](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/session/memory.ts#L15)

#### Parameters

##### baseUrl

`string`

##### entry

[`SessionEntry`](../interfaces/SessionEntry.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SessionStore`](../interfaces/SessionStore.md).[`set`](../interfaces/SessionStore.md#set)
