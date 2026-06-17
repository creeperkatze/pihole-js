[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / ClientHistoryResponse

# Interface: ClientHistoryResponse

Defined in: [types/metrics.ts:123](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L123)

## Extends

- [`ApiResponseBase`](ApiResponseBase.md)

## Properties

### clients

> **clients**: `Record`\<`string`, [`ClientHistorySummary`](ClientHistorySummary.md)\>

Defined in: [types/metrics.ts:124](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L124)

***

### history

> **history**: [`ClientHistoryBucket`](ClientHistoryBucket.md)[]

Defined in: [types/metrics.ts:125](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L125)

***

### took?

> `optional` **took?**: `number`

Defined in: [types/base.ts:9](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/base.ts#L9)

#### Inherited from

[`ApiResponseBase`](ApiResponseBase.md).[`took`](ApiResponseBase.md#took)
