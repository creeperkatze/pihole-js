[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / PiHoleClientOptions

# Interface: PiHoleClientOptions

Defined in: [types/base.ts:21](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L21)

Options for creating a [PiHoleClient](../classes/PiHoleClient.md).

## Properties

### baseUrl

> **baseUrl**: `string`

Defined in: [types/base.ts:25](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L25)

Base URL of the Pi-hole instance, for example `http://pi.hole`.

***

### fetch?

> `optional` **fetch?**: \{(`input`, `init?`): `Promise`\<`Response`\>; (`input`, `init?`): `Promise`\<`Response`\>; \}

Defined in: [types/base.ts:43](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L43)

Custom fetch implementation.

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`RequestInfo` \| `URL`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`string` \| `Request` \| `URL`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

***

### password?

> `optional` **password?**: `string`

Defined in: [types/base.ts:29](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L29)

Web interface password for authenticated installs.

***

### sessionStore?

> `optional` **sessionStore?**: [`SessionStore`](SessionStore.md)

Defined in: [types/base.ts:47](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L47)

Session store used to cache Pi-hole session IDs.

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [types/base.ts:35](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L35)

Request timeout in milliseconds.

#### Default Value

```ts
10000
```

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [types/base.ts:39](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L39)

Value to send as the `User-Agent` header on every request.
