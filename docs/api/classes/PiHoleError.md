[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / PiHoleError

# Class: PiHoleError

Defined in: [errors.ts:4](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L4)

Error thrown for request failures, authentication failures, timeouts, and Pi-hole API errors.

## Extends

- `Error`

## Constructors

### Constructor

> **new PiHoleError**(`message`, `options?`): `PiHoleError`

Defined in: [errors.ts:11](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L11)

#### Parameters

##### message

`string`

##### options?

###### body?

`unknown`

###### code?

`string`

###### response?

`Response`

###### status?

`number`

#### Returns

`PiHoleError`

#### Overrides

`Error.constructor`

## Properties

### body

> **body**: `unknown`

Defined in: [errors.ts:8](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L8)

***

### code

> **code**: `string` \| `undefined`

Defined in: [errors.ts:9](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L9)

***

### name

> **name**: `"PiHoleError"`

Defined in: [errors.ts:5](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L5)

#### Overrides

`Error.name`

***

### response

> **response**: `Response` \| `undefined`

Defined in: [errors.ts:7](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L7)

***

### status

> **status**: `number`

Defined in: [errors.ts:6](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/errors.ts#L6)
