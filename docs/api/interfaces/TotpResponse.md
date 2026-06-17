[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / TotpResponse

# Interface: TotpResponse

Defined in: [types/auth.ts:43](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/auth.ts#L43)

## Extends

- [`ApiResponseBase`](ApiResponseBase.md)

## Properties

### took?

> `optional` **took?**: `number`

Defined in: [types/base.ts:9](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L9)

#### Inherited from

[`ApiResponseBase`](ApiResponseBase.md).[`took`](ApiResponseBase.md#took)

***

### totp

> **totp**: `object`

Defined in: [types/auth.ts:44](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/auth.ts#L44)

#### account?

> `optional` **account?**: `string`

#### algorithm?

> `optional` **algorithm?**: `string`

#### codes?

> `optional` **codes?**: `number`[]

#### digits?

> `optional` **digits?**: `number`

#### issuer?

> `optional` **issuer?**: `string`

#### offset?

> `optional` **offset?**: `number`

#### period?

> `optional` **period?**: `number`

#### secret?

> `optional` **secret?**: `string`

#### type?

> `optional` **type?**: `string`
