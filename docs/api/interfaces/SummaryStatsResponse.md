[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / SummaryStatsResponse

# Interface: SummaryStatsResponse

Defined in: [types/metrics.ts:41](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L41)

## Extends

- [`ApiResponseBase`](ApiResponseBase.md)

## Properties

### clients

> **clients**: `object`

Defined in: [types/metrics.ts:47](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L47)

#### active

> **active**: `number`

#### total

> **total**: `number`

***

### gravity?

> `optional` **gravity?**: `object`

Defined in: [types/metrics.ts:48](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L48)

#### domains\_being\_blocked?

> `optional` **domains\_being\_blocked?**: `number`

#### last\_update?

> `optional` **last\_update?**: `number`

***

### queries

> **queries**: `object` & `object`

Defined in: [types/metrics.ts:42](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L42)

#### Type Declaration

##### blocked

> **blocked**: `number`

##### cached

> **cached**: `number`

##### forwarded

> **forwarded**: `number`

##### percent\_blocked

> **percent\_blocked**: `number`

##### total

> **total**: `number`

##### types

> **types**: `Record`\<`string`, `number`\>

##### unique\_domains

> **unique\_domains**: `number`

#### Type Declaration

##### frequency?

> `optional` **frequency?**: `number`

##### replies?

> `optional` **replies?**: `Record`\<`string`, `number`\>

##### status?

> `optional` **status?**: `Record`\<`string`, `number`\>

***

### took?

> `optional` **took?**: `number`

Defined in: [types/base.ts:9](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L9)

#### Inherited from

[`ApiResponseBase`](ApiResponseBase.md).[`took`](ApiResponseBase.md#took)
