[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / ManagementClient

# Class: ManagementClient

Defined in: [client/management.ts:25](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L25)

## Extends

- [`MetricsClient`](MetricsClient.md)

## Extended by

- [`SystemClient`](SystemClient.md)

## Constructors

### Constructor

> **new ManagementClient**(`options`): `ManagementClient`

Defined in: [client/management.ts:26](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L26)

#### Parameters

##### options

[`PiHoleClientOptions`](../interfaces/PiHoleClientOptions.md)

#### Returns

`ManagementClient`

#### Overrides

[`MetricsClient`](MetricsClient.md).[`constructor`](MetricsClient.md#constructor)

## Methods

### checkAuth()

> **checkAuth**(): `Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

Defined in: [client/auth.ts:17](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L17)

#### Returns

`Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`checkAuth`](MetricsClient.md#checkauth)

***

### createAppPassword()

> **createAppPassword**(): `Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

Defined in: [client/auth.ts:45](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L45)

#### Returns

`Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`createAppPassword`](MetricsClient.md#createapppassword)

***

### createClient()

> **createClient**(`payload`): `Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

Defined in: [client/management.ts:92](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L92)

#### Parameters

##### payload

[`ClientMutationPayload`](../interfaces/ClientMutationPayload.md)

#### Returns

`Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

***

### createDomain()

> **createDomain**(`type`, `kind`, `payload`): `Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

Defined in: [client/management.ts:34](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L34)

#### Parameters

##### type

[`DomainType`](../type-aliases/DomainType.md)

##### kind

[`DomainKind`](../type-aliases/DomainKind.md)

##### payload

[`DomainMutationPayload`](../interfaces/DomainMutationPayload.md)

#### Returns

`Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

***

### createGroup()

> **createGroup**(`payload`): `Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

Defined in: [client/management.ts:63](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L63)

#### Parameters

##### payload

[`GroupMutationPayload`](../interfaces/GroupMutationPayload.md)

#### Returns

`Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

***

### createList()

> **createList**(`type`, `payload`): `Promise`\<[`ListsResponse`](../interfaces/ListsResponse.md)\>

Defined in: [client/management.ts:126](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L126)

#### Parameters

##### type

[`ListType`](../type-aliases/ListType.md)

##### payload

[`ListMutationPayload`](../interfaces/ListMutationPayload.md)

#### Returns

`Promise`\<[`ListsResponse`](../interfaces/ListsResponse.md)\>

***

### deleteClient()

> **deleteClient**(`client`): `Promise`\<`void`\>

Defined in: [client/management.ts:106](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L106)

#### Parameters

##### client

`string`

#### Returns

`Promise`\<`void`\>

***

### deleteClients()

> **deleteClients**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:110](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L110)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

***

### deleteDomain()

> **deleteDomain**(`type`, `kind`, `domain`): `Promise`\<`void`\>

Defined in: [client/management.ts:48](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L48)

#### Parameters

##### type

[`DomainType`](../type-aliases/DomainType.md)

##### kind

[`DomainKind`](../type-aliases/DomainKind.md)

##### domain

`string`

#### Returns

`Promise`\<`void`\>

***

### deleteDomains()

> **deleteDomains**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:52](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L52)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

***

### deleteGroup()

> **deleteGroup**(`name`): `Promise`\<`void`\>

Defined in: [client/management.ts:77](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L77)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`void`\>

***

### deleteGroups()

> **deleteGroups**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:81](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L81)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

***

### deleteList()

> **deleteList**(`address`, `type`): `Promise`\<`void`\>

Defined in: [client/management.ts:142](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L142)

#### Parameters

##### address

`string`

##### type

[`ListType`](../type-aliases/ListType.md)

#### Returns

`Promise`\<`void`\>

***

### deleteLists()

> **deleteLists**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:149](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L149)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

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

[`MetricsClient`](MetricsClient.md).[`deleteSession`](MetricsClient.md#deletesession)

***

### getBlocking()

> **getBlocking**(): `Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

Defined in: [client/metrics.ts:85](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L85)

#### Returns

`Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getBlocking`](MetricsClient.md#getblocking)

***

### getClients()

> **getClients**(`client?`): `Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

Defined in: [client/management.ts:88](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L88)

#### Parameters

##### client?

`string`

#### Returns

`Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

***

### getClientSuggestions()

> **getClientSuggestions**(): `Promise`\<[`ClientSuggestionsResponse`](../interfaces/ClientSuggestionsResponse.md)\>

Defined in: [client/management.ts:117](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L117)

#### Returns

`Promise`\<[`ClientSuggestionsResponse`](../interfaces/ClientSuggestionsResponse.md)\>

***

### getDomains()

> **getDomains**(`options?`): `Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

Defined in: [client/management.ts:30](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L30)

#### Parameters

##### options?

[`DomainLookupOptions`](../interfaces/DomainLookupOptions.md)

#### Returns

`Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

***

### getGroups()

> **getGroups**(`name?`): `Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

Defined in: [client/management.ts:59](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L59)

#### Parameters

##### name?

`string`

#### Returns

`Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

***

### getHistory()

> **getHistory**(): `Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

Defined in: [client/metrics.ts:61](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L61)

#### Returns

`Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getHistory`](MetricsClient.md#gethistory)

***

### getHistoryClients()

> **getHistoryClients**(`options?`): `Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

Defined in: [client/metrics.ts:65](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L65)

#### Parameters

##### options?

[`HistoryClientsOptions`](../interfaces/HistoryClientsOptions.md)

#### Returns

`Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getHistoryClients`](MetricsClient.md#gethistoryclients)

***

### getHistoryDatabase()

> **getHistoryDatabase**(`options`): `Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

Defined in: [client/metrics.ts:69](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L69)

#### Parameters

##### options

`Pick`\<[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md), `"from"` \| `"until"`\>

#### Returns

`Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getHistoryDatabase`](MetricsClient.md#gethistorydatabase)

***

### getHistoryDatabaseClients()

> **getHistoryDatabaseClients**(`options`): `Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

Defined in: [client/metrics.ts:73](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L73)

#### Parameters

##### options

`Pick`\<[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md), `"from"` \| `"until"`\>

#### Returns

`Promise`\<[`ClientHistoryResponse`](../interfaces/ClientHistoryResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getHistoryDatabaseClients`](MetricsClient.md#gethistorydatabaseclients)

***

### getLists()

> **getLists**(`address?`, `options?`): `Promise`\<[`ListsResponse`](../interfaces/ListsResponse.md)\>

Defined in: [client/management.ts:121](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L121)

#### Parameters

##### address?

`string`

##### options?

[`ListLookupOptions`](../interfaces/ListLookupOptions.md)

#### Returns

`Promise`\<[`ListsResponse`](../interfaces/ListsResponse.md)\>

***

### getQueries()

> **getQueries**(`options?`): `Promise`\<[`QueriesResponse`](../interfaces/QueriesResponse.md)\>

Defined in: [client/metrics.ts:77](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L77)

#### Parameters

##### options?

[`QueryListOptions`](../interfaces/QueryListOptions.md)

#### Returns

`Promise`\<[`QueriesResponse`](../interfaces/QueriesResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getQueries`](MetricsClient.md#getqueries)

***

### getQuerySuggestions()

> **getQuerySuggestions**(): `Promise`\<[`QuerySuggestionsResponse`](../interfaces/QuerySuggestionsResponse.md)\>

Defined in: [client/metrics.ts:81](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L81)

#### Returns

`Promise`\<[`QuerySuggestionsResponse`](../interfaces/QuerySuggestionsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getQuerySuggestions`](MetricsClient.md#getquerysuggestions)

***

### getSessions()

> **getSessions**(): `Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

Defined in: [client/auth.ts:33](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L33)

#### Returns

`Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getSessions`](MetricsClient.md#getsessions)

***

### getStatsDatabaseSummary()

> **getStatsDatabaseSummary**(`options`): `Promise`\<[`DatabaseSummaryResponse`](../interfaces/DatabaseSummaryResponse.md)\>

Defined in: [client/metrics.ts:30](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L30)

#### Parameters

##### options

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`DatabaseSummaryResponse`](../interfaces/DatabaseSummaryResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsDatabaseSummary`](MetricsClient.md#getstatsdatabasesummary)

***

### getStatsDatabaseUpstreams()

> **getStatsDatabaseUpstreams**(`options`): `Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

Defined in: [client/metrics.ts:38](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L38)

#### Parameters

##### options

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsDatabaseUpstreams`](MetricsClient.md#getstatsdatabaseupstreams)

***

### getStatsQueryTypes()

> **getStatsQueryTypes**(`options?`): `Promise`\<[`QueryTypesResponse`](../interfaces/QueryTypesResponse.md)\>

Defined in: [client/metrics.ts:52](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L52)

#### Parameters

##### options?

`Pick`\<[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md), `"from"` \| `"until"`\>

#### Returns

`Promise`\<[`QueryTypesResponse`](../interfaces/QueryTypesResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsQueryTypes`](MetricsClient.md#getstatsquerytypes)

***

### getStatsRecentBlocked()

> **getStatsRecentBlocked**(`count?`): `Promise`\<[`RecentBlockedResponse`](../interfaces/RecentBlockedResponse.md)\>

Defined in: [client/metrics.ts:57](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L57)

#### Parameters

##### count?

`number`

#### Returns

`Promise`\<[`RecentBlockedResponse`](../interfaces/RecentBlockedResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsRecentBlocked`](MetricsClient.md#getstatsrecentblocked)

***

### getStatsSummary()

> **getStatsSummary**(): `Promise`\<[`SummaryStatsResponse`](../interfaces/SummaryStatsResponse.md)\>

Defined in: [client/metrics.ts:26](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L26)

#### Returns

`Promise`\<[`SummaryStatsResponse`](../interfaces/SummaryStatsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsSummary`](MetricsClient.md#getstatssummary)

***

### getStatsTopClients()

> **getStatsTopClients**(`options?`): `Promise`\<[`TopClientsResponse`](../interfaces/TopClientsResponse.md)\>

Defined in: [client/metrics.ts:47](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L47)

#### Parameters

##### options?

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`TopClientsResponse`](../interfaces/TopClientsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsTopClients`](MetricsClient.md#getstatstopclients)

***

### getStatsTopDomains()

> **getStatsTopDomains**(`options?`): `Promise`\<[`TopDomainsResponse`](../interfaces/TopDomainsResponse.md)\>

Defined in: [client/metrics.ts:42](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L42)

#### Parameters

##### options?

[`DatabaseQueryOptions`](../interfaces/DatabaseQueryOptions.md)

#### Returns

`Promise`\<[`TopDomainsResponse`](../interfaces/TopDomainsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsTopDomains`](MetricsClient.md#getstatstopdomains)

***

### getStatsUpstreams()

> **getStatsUpstreams**(): `Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

Defined in: [client/metrics.ts:34](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L34)

#### Returns

`Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getStatsUpstreams`](MetricsClient.md#getstatsupstreams)

***

### getTotp()

> **getTotp**(): `Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

Defined in: [client/auth.ts:37](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L37)

#### Returns

`Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`getTotp`](MetricsClient.md#gettotp)

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

[`MetricsClient`](MetricsClient.md).[`login`](MetricsClient.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: [client/auth.ts:29](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L29)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`logout`](MetricsClient.md#logout)

***

### replaceClient()

> **replaceClient**(`client`, `payload`): `Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

Defined in: [client/management.ts:99](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L99)

#### Parameters

##### client

`string`

##### payload

[`ClientReplacePayload`](../interfaces/ClientReplacePayload.md)

#### Returns

`Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

***

### replaceDomain()

> **replaceDomain**(`type`, `kind`, `domain`, `payload`): `Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

Defined in: [client/management.ts:41](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L41)

#### Parameters

##### type

[`DomainType`](../type-aliases/DomainType.md)

##### kind

[`DomainKind`](../type-aliases/DomainKind.md)

##### domain

`string`

##### payload

[`DomainReplacePayload`](../interfaces/DomainReplacePayload.md)

#### Returns

`Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

***

### replaceGroup()

> **replaceGroup**(`name`, `payload`): `Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

Defined in: [client/management.ts:70](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L70)

#### Parameters

##### name

`string`

##### payload

[`GroupReplacePayload`](../interfaces/GroupReplacePayload.md)

#### Returns

`Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

***

### replaceList()

> **replaceList**(`address`, `payload`): `Promise`\<[`ListsResponse`](../interfaces/ListsResponse.md)\>

Defined in: [client/management.ts:134](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L134)

#### Parameters

##### address

`string`

##### payload

[`ListReplacePayload`](../interfaces/ListReplacePayload.md)

#### Returns

`Promise`\<[`ListsResponse`](../interfaces/ListsResponse.md)\>

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

#### Inherited from

[`MetricsClient`](MetricsClient.md).[`updateBlocking`](MetricsClient.md#updateblocking)

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

[`MetricsClient`](MetricsClient.md).[`withSession`](MetricsClient.md#withsession)
