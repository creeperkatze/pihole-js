[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / PiholeSummary

# Interface: PiholeSummary

Defined in: [types/metrics.ts:20](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L20)

## Properties

### blocking

> **blocking**: [`BlockingStatus`](BlockingStatus.md)

Defined in: [types/metrics.ts:34](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L34)

***

### clients

> **clients**: `object`

Defined in: [types/metrics.ts:30](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L30)

#### active

> **active**: `number`

#### total

> **total**: `number`

***

### diagnosis

> **diagnosis**: [`PiholeDiagnosis`](PiholeDiagnosis.md) \| `null`

Defined in: [types/metrics.ts:38](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L38)

***

### groups

> **groups**: [`PiholeGroup`](PiholeGroup.md)[]

Defined in: [types/metrics.ts:36](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L36)

***

### history

> **history**: [`HistoryPoint`](HistoryPoint.md)[]

Defined in: [types/metrics.ts:35](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L35)

***

### lists

> **lists**: [`PiholeList`](PiholeList.md)[]

Defined in: [types/metrics.ts:37](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L37)

***

### queries

> **queries**: `object`

Defined in: [types/metrics.ts:21](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/metrics.ts#L21)

#### blocked

> **blocked**: `number`

#### cached

> **cached**: `number`

#### forwarded

> **forwarded**: `number`

#### percent\_blocked

> **percent\_blocked**: `number`

#### total

> **total**: `number`

#### types

> **types**: `Record`\<`string`, `number`\>

#### unique\_domains

> **unique\_domains**: `number`
