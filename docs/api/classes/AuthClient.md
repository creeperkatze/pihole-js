[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / AuthClient

# Class: AuthClient

Defined in: [client/auth.ts:12](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L12)

## Extends

- [`PiHoleClientCore`](PiHoleClientCore.md)

## Extended by

- [`MetricsClient`](MetricsClient.md)

## Constructors

### Constructor

> **new AuthClient**(`options`): `AuthClient`

Defined in: [client/auth.ts:13](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L13)

#### Parameters

##### options

[`PiHoleClientOptions`](../interfaces/PiHoleClientOptions.md)

#### Returns

`AuthClient`

#### Overrides

`PiHoleClientCore.constructor`

## Methods

### checkAuth()

> **checkAuth**(): `Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

Defined in: [client/auth.ts:17](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L17)

#### Returns

`Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

***

### createAppPassword()

> **createAppPassword**(): `Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

Defined in: [client/auth.ts:45](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L45)

#### Returns

`Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

***

### deleteSession()

> **deleteSession**(`id`): `Promise`\<`void`\>

Defined in: [client/auth.ts:41](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L41)

#### Parameters

##### id

`number`

#### Returns

`Promise`\<`void`\>

***

### getSessions()

> **getSessions**(): `Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

Defined in: [client/auth.ts:33](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L33)

#### Returns

`Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

***

### getTotp()

> **getTotp**(): `Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

Defined in: [client/auth.ts:37](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L37)

#### Returns

`Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

***

### login()

> **login**(`credentials?`): `Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

Defined in: [client/auth.ts:21](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L21)

#### Parameters

##### credentials?

[`AuthRequest`](../interfaces/AuthRequest.md)

#### Returns

`Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: [client/auth.ts:29](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L29)

#### Returns

`Promise`\<`void`\>

***

### withSession()

> **withSession**\<`T`\>(`fn`): `Promise`\<`T`\>

Defined in: [client/core.ts:85](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/core.ts#L85)

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

(`sid`) => `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`PiHoleClientCore`](PiHoleClientCore.md).[`withSession`](PiHoleClientCore.md#withsession)
