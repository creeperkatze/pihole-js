[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / DomainSearchResult

# Interface: DomainSearchResult

Defined in: [types/resources.ts:78](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/resources.ts#L78)

## Properties

### domains

> **domains**: [`DomainEntry`](DomainEntry.md)[]

Defined in: [types/resources.ts:79](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/resources.ts#L79)

***

### gravity

> **gravity**: [`GravitySearchEntry`](GravitySearchEntry.md)[]

Defined in: [types/resources.ts:80](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/resources.ts#L80)

***

### parameters?

> `optional` **parameters?**: `object`

Defined in: [types/resources.ts:81](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/resources.ts#L81)

#### debug?

> `optional` **debug?**: `boolean`

#### domain?

> `optional` **domain?**: `string`

#### N?

> `optional` **N?**: `number`

#### partial?

> `optional` **partial?**: `boolean`

***

### results?

> `optional` **results?**: `object`

Defined in: [types/resources.ts:87](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/types/resources.ts#L87)

#### domains?

> `optional` **domains?**: `object`

##### domains.exact?

> `optional` **exact?**: `number`

##### domains.regex?

> `optional` **regex?**: `number`

#### gravity?

> `optional` **gravity?**: `object`

##### gravity.allow?

> `optional` **allow?**: `number`

##### gravity.block?

> `optional` **block?**: `number`

#### total?

> `optional` **total?**: `number`
