[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / PaddResponse

# Interface: PaddResponse

Defined in: [types/metrics.ts:172](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L172)

## Extends

- [`ApiResponseBase`](ApiResponseBase.md)

## Indexable

> \[`key`: `string`\]: [`JsonValue`](../type-aliases/JsonValue.md) \| `undefined`

## Properties

### %cpu?

> `optional` **%cpu?**: `number`

Defined in: [types/metrics.ts:173](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L173)

***

### %mem?

> `optional` **%mem?**: `number`

Defined in: [types/metrics.ts:174](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L174)

***

### sensors?

> `optional` **sensors?**: `object`

Defined in: [types/metrics.ts:175](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L175)

#### cpu\_temp

> **cpu\_temp**: `number` \| `null`

#### unit

> **unit**: `string`

***

### system?

> `optional` **system?**: `object`

Defined in: [types/metrics.ts:179](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L179)

#### uptime

> **uptime**: `number`

***

### took?

> `optional` **took?**: `number`

Defined in: [types/base.ts:9](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L9)

#### Inherited from

[`ApiResponseBase`](ApiResponseBase.md).[`took`](ApiResponseBase.md#took)
