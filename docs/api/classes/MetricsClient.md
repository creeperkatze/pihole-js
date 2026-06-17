[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / MetricsClient

# Class: MetricsClient

Defined in: [client/metrics.ts:21](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L21)

## Extends

- [`AuthClient`](AuthClient.md)

## Extended by

- [`ManagementClient`](ManagementClient.md)

## Constructors

### Constructor

> **new MetricsClient**(`options`): `MetricsClient`

Defined in: [client/metrics.ts:22](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L22)

#### Parameters

##### options

[`PiHoleClientOptions`](../interfaces/PiHoleClientOptions.md)

#### Returns

`MetricsClient`

#### Overrides

[`AuthClient`](AuthClient.md).[`constructor`](AuthClient.md#constructor)

## Methods

### checkAuth()

> **checkAuth**(): `Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

Defined in: [client/auth.ts:17](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L17)

#### Returns

`Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`checkAuth`](AuthClient.md#checkauth)

***

### createAppPassword()

> **createAppPassword**(): `Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

Defined in: [client/auth.ts:45](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L45)

#### Returns

`Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`createAppPassword`](AuthClient.md#createapppassword)

***

### deleteSession()

> **deleteSession**(`id`): `Promise`\<`void`\>

Defined in: [client/auth.ts:41](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L41)

#### Parameters

##### id

`number`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`deleteSession`](AuthClient.md#deletesession)

***

### getBlocking()

> **getBlocking**(): `Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

Defined in: [client/metrics.ts:85](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L85)

#### Returns

`Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

***

### getHistory()

> **getHistory**(): `Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

Defined in: [client/metrics.ts:61](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L61)

#### Returns

`Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

***

### getHistoryClients()

> **getHistoryClients**(`options?`): `Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

Defined in: [client/metrics.ts:65](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L65)

#### Parameters

##### options?

[`HistoryClientsOptions`](../interfaces/HistoryClientsOptions.md)

#### Returns

`Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

***

### getHistoryDatabase()

> **getHistoryDatabase**(`options`): `Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

Defined in: [client/metrics.ts:69](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L69)

#### Parameters

##### options

`Pick`\<[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md), `"from"` \| `"until"`\>

#### Returns

`Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

***

### getHistoryDatabaseClients()

> **getHistoryDatabaseClients**(`options`): `Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

Defined in: [client/metrics.ts:73](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L73)

#### Parameters

##### options

`Pick`\<[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md), `"from"` \| `"until"`\>

#### Returns

`Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

***

### getQueries()

> **getQueries**(`options?`): `Promise`\<[`QueriesResponse`](../interfaces/QueriesResponse.md)\>

Defined in: [client/metrics.ts:77](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L77)

#### Parameters

##### options?

[`QueryListOptions`](../interfaces/QueryListOptions.md)

#### Returns

`Promise`\<[`QueriesResponse`](../interfaces/QueriesResponse.md)\>

***

### getQuerySuggestions()

> **getQuerySuggestions**(): `Promise`\<[`QuerySuggestionsResponse`](../interfaces/QuerySuggestionsResponse.md)\>

Defined in: [client/metrics.ts:81](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L81)

#### Returns

`Promise`\<[`QuerySuggestionsResponse`](../interfaces/QuerySuggestionsResponse.md)\>

***

### getSessions()

> **getSessions**(): `Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

Defined in: [client/auth.ts:33](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L33)

#### Returns

`Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`getSessions`](AuthClient.md#getsessions)

***

### getStatsDatabaseSummary()

> **getStatsDatabaseSummary**(`options`): `Promise`\<[`DatabaseSummaryResponse`](../interfaces/DatabaseSummaryResponse.md)\>

Defined in: [client/metrics.ts:30](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L30)

#### Parameters

##### options

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`DatabaseSummaryResponse`](../interfaces/DatabaseSummaryResponse.md)\>

***

### getStatsDatabaseUpstreams()

> **getStatsDatabaseUpstreams**(`options`): `Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

Defined in: [client/metrics.ts:38](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L38)

#### Parameters

##### options

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

***

### getStatsQueryTypes()

> **getStatsQueryTypes**(`options?`): `Promise`\<[`QueryTypesResponse`](../interfaces/QueryTypesResponse.md)\>

Defined in: [client/metrics.ts:52](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L52)

#### Parameters

##### options?

`Pick`\<[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md), `"from"` \| `"until"`\>

#### Returns

`Promise`\<[`QueryTypesResponse`](../interfaces/QueryTypesResponse.md)\>

***

### getStatsRecentBlocked()

> **getStatsRecentBlocked**(`count?`): `Promise`\<[`RecentBlockedResponse`](../interfaces/RecentBlockedResponse.md)\>

Defined in: [client/metrics.ts:57](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L57)

#### Parameters

##### count?

`number`

#### Returns

`Promise`\<[`RecentBlockedResponse`](../interfaces/RecentBlockedResponse.md)\>

***

### getStatsSummary()

> **getStatsSummary**(): `Promise`\<[`SummaryStatsResponse`](../interfaces/SummaryStatsResponse.md)\>

Defined in: [client/metrics.ts:26](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L26)

#### Returns

`Promise`\<[`SummaryStatsResponse`](../interfaces/SummaryStatsResponse.md)\>

***

### getStatsTopClients()

> **getStatsTopClients**(`options?`): `Promise`\<[`TopClientsResponse`](../interfaces/TopClientsResponse.md)\>

Defined in: [client/metrics.ts:47](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L47)

#### Parameters

##### options?

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`TopClientsResponse`](../interfaces/TopClientsResponse.md)\>

***

### getStatsTopDomains()

> **getStatsTopDomains**(`options?`): `Promise`\<[`TopDomainsResponse`](../interfaces/TopDomainsResponse.md)\>

Defined in: [client/metrics.ts:42](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L42)

#### Parameters

##### options?

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`TopDomainsResponse`](../interfaces/TopDomainsResponse.md)\>

***

### getStatsUpstreams()

> **getStatsUpstreams**(): `Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

Defined in: [client/metrics.ts:34](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L34)

#### Returns

`Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

***

### getTotp()

> **getTotp**(): `Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

Defined in: [client/auth.ts:37](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L37)

#### Returns

`Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`getTotp`](AuthClient.md#gettotp)

***

### login()

> **login**(`credentials?`): `Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

Defined in: [client/auth.ts:21](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L21)

#### Parameters

##### credentials?

[`AuthRequest`](../interfaces/AuthRequest.md)

#### Returns

`Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`login`](AuthClient.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: [client/auth.ts:29](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L29)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AuthClient`](AuthClient.md).[`logout`](AuthClient.md#logout)

***

### updateBlocking()

> **updateBlocking**(`blocking`, `timer?`): `Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

Defined in: [client/metrics.ts:89](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L89)

#### Parameters

##### blocking

`boolean`

##### timer?

`number` \| `null`

#### Returns

`Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

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

[`AuthClient`](AuthClient.md).[`withSession`](AuthClient.md#withsession)
