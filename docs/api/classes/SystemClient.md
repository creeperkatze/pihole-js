[**pihole-js**](../index.md)

***

[pihole-js](../index.md) / SystemClient

# Class: SystemClient

Defined in: [client/system.ts:29](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L29)

## Extends

- [`ManagementClient`](ManagementClient.md)

## Extended by

- [`PiHoleClient`](PiHoleClient.md)

## Constructors

### Constructor

> **new SystemClient**(`options`): `SystemClient`

Defined in: [client/system.ts:30](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L30)

#### Parameters

##### options

[`PiHoleClientOptions`](../interfaces/PiHoleClientOptions.md)

#### Returns

`SystemClient`

#### Overrides

[`ManagementClient`](ManagementClient.md).[`constructor`](ManagementClient.md#constructor)

## Methods

### addConfigArrayItem()

> **addConfigArrayItem**(`element`, `value`, `options?`): `Promise`\<`void`\>

Defined in: [client/system.ts:115](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L115)

#### Parameters

##### element

`string`

##### value

`string`

##### options?

[`ConfigMutationOptions`](../interfaces/ConfigMutationOptions.md)

#### Returns

`Promise`\<`void`\>

***

### checkAuth()

> **checkAuth**(): `Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

Defined in: [client/auth.ts:17](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L17)

#### Returns

`Promise`\<[`AuthResponse`](../interfaces/AuthResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`checkAuth`](ManagementClient.md#checkauth)

***

### createAppPassword()

> **createAppPassword**(): `Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

Defined in: [client/auth.ts:45](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L45)

#### Returns

`Promise`\<[`AppPasswordResponse`](../interfaces/AppPasswordResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`createAppPassword`](ManagementClient.md#createapppassword)

***

### createClient()

> **createClient**(`payload`): `Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

Defined in: [client/management.ts:92](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L92)

#### Parameters

##### payload

[`ClientMutationPayload`](../interfaces/ClientMutationPayload.md)

#### Returns

`Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`createClient`](ManagementClient.md#createclient)

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`createDomain`](ManagementClient.md#createdomain)

***

### createGroup()

> **createGroup**(`payload`): `Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

Defined in: [client/management.ts:63](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L63)

#### Parameters

##### payload

[`GroupMutationPayload`](../interfaces/GroupMutationPayload.md)

#### Returns

`Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`createGroup`](ManagementClient.md#creategroup)

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`createList`](ManagementClient.md#createlist)

***

### deleteClient()

> **deleteClient**(`client`): `Promise`\<`void`\>

Defined in: [client/management.ts:106](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L106)

#### Parameters

##### client

`string`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteClient`](ManagementClient.md#deleteclient)

***

### deleteClients()

> **deleteClients**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:110](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L110)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteClients`](ManagementClient.md#deleteclients)

***

### deleteConfigArrayItem()

> **deleteConfigArrayItem**(`element`, `value`, `options?`): `Promise`\<`void`\>

Defined in: [client/system.ts:122](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L122)

#### Parameters

##### element

`string`

##### value

`string`

##### options?

[`ConfigMutationOptions`](../interfaces/ConfigMutationOptions.md)

#### Returns

`Promise`\<`void`\>

***

### deleteDhcpLease()

> **deleteDhcpLease**(`ip`): `Promise`\<`void`\>

Defined in: [client/system.ts:200](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L200)

#### Parameters

##### ip

`string`

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteDomain`](ManagementClient.md#deletedomain)

***

### deleteDomains()

> **deleteDomains**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:52](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L52)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteDomains`](ManagementClient.md#deletedomains)

***

### deleteGroup()

> **deleteGroup**(`name`): `Promise`\<`void`\>

Defined in: [client/management.ts:77](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L77)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteGroup`](ManagementClient.md#deletegroup)

***

### deleteGroups()

> **deleteGroups**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:81](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L81)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteGroups`](ManagementClient.md#deletegroups)

***

### deleteInfoMessages()

> **deleteInfoMessages**(`messageIds`): `Promise`\<`void`\>

Defined in: [client/system.ts:66](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L66)

#### Parameters

##### messageIds

`string` \| `number` \| (`string` \| `number`)[]

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteList`](ManagementClient.md#deletelist)

***

### deleteLists()

> **deleteLists**(`items`): `Promise`\<`void`\>

Defined in: [client/management.ts:149](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L149)

#### Parameters

##### items

`object`[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`deleteLists`](ManagementClient.md#deletelists)

***

### deleteNetworkDevice()

> **deleteNetworkDevice**(`deviceId`): `Promise`\<`void`\>

Defined in: [client/system.ts:133](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L133)

#### Parameters

##### deviceId

`number`

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

[`ManagementClient`](ManagementClient.md).[`deleteSession`](ManagementClient.md#deletesession)

***

### exportTeleporter()

> **exportTeleporter**(): `Promise`\<`ArrayBuffer`\>

Defined in: [client/system.ts:149](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L149)

#### Returns

`Promise`\<`ArrayBuffer`\>

***

### flushArp()

> **flushArp**(): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [client/system.ts:188](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L188)

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### flushLogs()

> **flushLogs**(): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [client/system.ts:184](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L184)

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### flushNetwork()

> **flushNetwork**(): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [client/system.ts:192](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L192)

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### getBlocking()

> **getBlocking**(): `Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

Defined in: [client/metrics.ts:85](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L85)

#### Returns

`Promise`\<[`BlockingStatus`](../interfaces/BlockingStatus.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getBlocking`](ManagementClient.md#getblocking)

***

### getClients()

> **getClients**(`client?`): `Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

Defined in: [client/management.ts:88](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L88)

#### Parameters

##### client?

`string`

#### Returns

`Promise`\<[`ClientsResponse`](../interfaces/ClientsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getClients`](ManagementClient.md#getclients)

***

### getClientSuggestions()

> **getClientSuggestions**(): `Promise`\<[`ClientSuggestionsResponse`](../interfaces/ClientSuggestionsResponse.md)\>

Defined in: [client/management.ts:117](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L117)

#### Returns

`Promise`\<[`ClientSuggestionsResponse`](../interfaces/ClientSuggestionsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getClientSuggestions`](ManagementClient.md#getclientsuggestions)

***

### getConfig()

> **getConfig**(`options?`): `Promise`\<[`ConfigResponse`](../interfaces/ConfigResponse.md)\>

Defined in: [client/system.ts:99](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L99)

#### Parameters

##### options?

[`ConfigQueryOptions`](../interfaces/ConfigQueryOptions.md)

#### Returns

`Promise`\<[`ConfigResponse`](../interfaces/ConfigResponse.md)\>

***

### getConfigElement()

> **getConfigElement**(`element`, `options?`): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:111](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L111)

#### Parameters

##### element

`string`

##### options?

[`ConfigQueryOptions`](../interfaces/ConfigQueryOptions.md)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getDhcpLeases()

> **getDhcpLeases**(): `Promise`\<[`DhcpLeasesResponse`](../interfaces/DhcpLeasesResponse.md)\>

Defined in: [client/system.ts:196](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L196)

#### Returns

`Promise`\<[`DhcpLeasesResponse`](../interfaces/DhcpLeasesResponse.md)\>

***

### getDnsmasqLog()

> **getDnsmasqLog**(`options?`): `Promise`\<[`LogsResponse`](../interfaces/LogsResponse.md)\>

Defined in: [client/system.ts:83](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L83)

#### Parameters

##### options?

[`LogsOptions`](../interfaces/LogsOptions.md)

#### Returns

`Promise`\<[`LogsResponse`](../interfaces/LogsResponse.md)\>

***

### getDocs()

> **getDocs**(): `Promise`\<`string`\>

Defined in: [client/system.ts:208](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L208)

#### Returns

`Promise`\<`string`\>

***

### getDomains()

> **getDomains**(`options?`): `Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

Defined in: [client/management.ts:30](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L30)

#### Parameters

##### options?

[`DomainLookupOptions`](../interfaces/DomainLookupOptions.md)

#### Returns

`Promise`\<[`DomainsResponse`](../interfaces/DomainsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getDomains`](ManagementClient.md#getdomains)

***

### getEndpoints()

> **getEndpoints**(): `Promise`\<[`EndpointsResponse`](../interfaces/EndpointsResponse.md)\>

Defined in: [client/system.ts:95](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L95)

#### Returns

`Promise`\<[`EndpointsResponse`](../interfaces/EndpointsResponse.md)\>

***

### getFtlLog()

> **getFtlLog**(`options?`): `Promise`\<[`LogsResponse`](../interfaces/LogsResponse.md)\>

Defined in: [client/system.ts:87](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L87)

#### Parameters

##### options?

[`LogsOptions`](../interfaces/LogsOptions.md)

#### Returns

`Promise`\<[`LogsResponse`](../interfaces/LogsResponse.md)\>

***

### getGroups()

> **getGroups**(`name?`): `Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

Defined in: [client/management.ts:59](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/management.ts#L59)

#### Parameters

##### name?

`string`

#### Returns

`Promise`\<[`GroupsResponse`](../interfaces/GroupsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getGroups`](ManagementClient.md#getgroups)

***

### getHistory()

> **getHistory**(): `Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

Defined in: [client/metrics.ts:61](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L61)

#### Returns

`Promise`\<[`HistoryResponse`](../interfaces/HistoryResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getHistory`](ManagementClient.md#gethistory)

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

[`ManagementClient`](ManagementClient.md).[`getHistoryClients`](ManagementClient.md#gethistoryclients)

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

[`ManagementClient`](ManagementClient.md).[`getHistoryDatabase`](ManagementClient.md#gethistorydatabase)

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

[`ManagementClient`](ManagementClient.md).[`getHistoryDatabaseClients`](ManagementClient.md#gethistorydatabaseclients)

***

### getInfoClient()

> **getInfoClient**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:34](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L34)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoDatabase()

> **getInfoDatabase**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:42](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L42)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoFtl()

> **getInfoFtl**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:46](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L46)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoHost()

> **getInfoHost**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:50](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L50)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoLogin()

> **getInfoLogin**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:79](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L79)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoMessages()

> **getInfoMessages**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:62](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L62)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoMessagesCount()

> **getInfoMessagesCount**(): `Promise`\<[`CountResponse`](../interfaces/CountResponse.md)\>

Defined in: [client/system.ts:71](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L71)

#### Returns

`Promise`\<[`CountResponse`](../interfaces/CountResponse.md)\>

***

### getInfoMetrics()

> **getInfoMetrics**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:75](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L75)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoSensors()

> **getInfoSensors**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:54](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L54)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoSystem()

> **getInfoSystem**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:38](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L38)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

***

### getInfoVersion()

> **getInfoVersion**(): `Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

Defined in: [client/system.ts:58](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L58)

#### Returns

`Promise`\<[`GenericApiResponse`](../interfaces/GenericApiResponse.md)\>

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getLists`](ManagementClient.md#getlists)

***

### getNetworkDevices()

> **getNetworkDevices**(`options?`): `Promise`\<[`NetworkDevicesResponse`](../interfaces/NetworkDevicesResponse.md)\>

Defined in: [client/system.ts:129](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L129)

#### Parameters

##### options?

[`NetworkDevicesOptions`](../interfaces/NetworkDevicesOptions.md)

#### Returns

`Promise`\<[`NetworkDevicesResponse`](../interfaces/NetworkDevicesResponse.md)\>

***

### getNetworkGateway()

> **getNetworkGateway**(`options?`): `Promise`\<[`GatewayResponse`](../interfaces/GatewayResponse.md)\>

Defined in: [client/system.ts:137](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L137)

#### Parameters

##### options?

[`DetailedNetworkOptions`](../interfaces/DetailedNetworkOptions.md)

#### Returns

`Promise`\<[`GatewayResponse`](../interfaces/GatewayResponse.md)\>

***

### getNetworkInterfaces()

> **getNetworkInterfaces**(`options?`): `Promise`\<[`InterfacesResponse`](../interfaces/InterfacesResponse.md)\>

Defined in: [client/system.ts:145](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L145)

#### Parameters

##### options?

[`DetailedNetworkOptions`](../interfaces/DetailedNetworkOptions.md)

#### Returns

`Promise`\<[`InterfacesResponse`](../interfaces/InterfacesResponse.md)\>

***

### getNetworkRoutes()

> **getNetworkRoutes**(`options?`): `Promise`\<[`RoutesResponse`](../interfaces/RoutesResponse.md)\>

Defined in: [client/system.ts:141](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L141)

#### Parameters

##### options?

[`DetailedNetworkOptions`](../interfaces/DetailedNetworkOptions.md)

#### Returns

`Promise`\<[`RoutesResponse`](../interfaces/RoutesResponse.md)\>

***

### getPadd()

> **getPadd**(): `Promise`\<[`PaddResponse`](../interfaces/PaddResponse.md)\>

Defined in: [client/system.ts:212](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L212)

#### Returns

`Promise`\<[`PaddResponse`](../interfaces/PaddResponse.md)\>

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

[`ManagementClient`](ManagementClient.md).[`getQueries`](ManagementClient.md#getqueries)

***

### getQuerySuggestions()

> **getQuerySuggestions**(): `Promise`\<[`QuerySuggestionsResponse`](../interfaces/QuerySuggestionsResponse.md)\>

Defined in: [client/metrics.ts:81](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L81)

#### Returns

`Promise`\<[`QuerySuggestionsResponse`](../interfaces/QuerySuggestionsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getQuerySuggestions`](ManagementClient.md#getquerysuggestions)

***

### getSearch()

> **getSearch**(`domain`, `options?`): `Promise`\<[`SearchResponse`](../interfaces/SearchResponse.md)\>

Defined in: [client/system.ts:204](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L204)

#### Parameters

##### domain

`string`

##### options?

[`SearchOptions`](../interfaces/SearchOptions.md)

#### Returns

`Promise`\<[`SearchResponse`](../interfaces/SearchResponse.md)\>

***

### getSessions()

> **getSessions**(): `Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

Defined in: [client/auth.ts:33](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L33)

#### Returns

`Promise`\<[`AuthSessionsResponse`](../interfaces/AuthSessionsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getSessions`](ManagementClient.md#getsessions)

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

[`ManagementClient`](ManagementClient.md).[`getStatsDatabaseSummary`](ManagementClient.md#getstatsdatabasesummary)

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

[`ManagementClient`](ManagementClient.md).[`getStatsDatabaseUpstreams`](ManagementClient.md#getstatsdatabaseupstreams)

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

[`ManagementClient`](ManagementClient.md).[`getStatsQueryTypes`](ManagementClient.md#getstatsquerytypes)

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

[`ManagementClient`](ManagementClient.md).[`getStatsRecentBlocked`](ManagementClient.md#getstatsrecentblocked)

***

### getStatsSummary()

> **getStatsSummary**(): `Promise`\<[`SummaryStatsResponse`](../interfaces/SummaryStatsResponse.md)\>

Defined in: [client/metrics.ts:26](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L26)

#### Returns

`Promise`\<[`SummaryStatsResponse`](../interfaces/SummaryStatsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getStatsSummary`](ManagementClient.md#getstatssummary)

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

[`ManagementClient`](ManagementClient.md).[`getStatsTopClients`](ManagementClient.md#getstatstopclients)

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

[`ManagementClient`](ManagementClient.md).[`getStatsTopDomains`](ManagementClient.md#getstatstopdomains)

***

### getStatsUpstreams()

> **getStatsUpstreams**(): `Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

Defined in: [client/metrics.ts:34](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/metrics.ts#L34)

#### Returns

`Promise`\<[`UpstreamsResponse`](../interfaces/UpstreamsResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getStatsUpstreams`](ManagementClient.md#getstatsupstreams)

***

### getTotp()

> **getTotp**(): `Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

Defined in: [client/auth.ts:37](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L37)

#### Returns

`Promise`\<[`TotpResponse`](../interfaces/TotpResponse.md)\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`getTotp`](ManagementClient.md#gettotp)

***

### getWebserverLog()

> **getWebserverLog**(`options?`): `Promise`\<[`LogsResponse`](../interfaces/LogsResponse.md)\>

Defined in: [client/system.ts:91](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L91)

#### Parameters

##### options?

[`LogsOptions`](../interfaces/LogsOptions.md)

#### Returns

`Promise`\<[`LogsResponse`](../interfaces/LogsResponse.md)\>

***

### importTeleporter()

> **importTeleporter**(`archive`, `selection?`): `Promise`\<[`TeleporterImportResponse`](../interfaces/TeleporterImportResponse.md)\>

Defined in: [client/system.ts:153](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L153)

#### Parameters

##### archive

`ArrayBuffer` \| `Uint8Array`\<`ArrayBufferLike`\> \| `Blob`

##### selection?

[`TeleporterImportSelection`](../interfaces/TeleporterImportSelection.md)

#### Returns

`Promise`\<[`TeleporterImportResponse`](../interfaces/TeleporterImportResponse.md)\>

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

[`ManagementClient`](ManagementClient.md).[`login`](ManagementClient.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: [client/auth.ts:29](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/auth.ts#L29)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`logout`](ManagementClient.md#logout)

***

### patchConfig()

> **patchConfig**(`config`, `options?`): `Promise`\<[`ConfigResponse`](../interfaces/ConfigResponse.md)\>

Defined in: [client/system.ts:103](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L103)

#### Parameters

##### config

[`JsonObject`](../interfaces/JsonObject.md)

##### options?

[`ConfigMutationOptions`](../interfaces/ConfigMutationOptions.md)

#### Returns

`Promise`\<[`ConfigResponse`](../interfaces/ConfigResponse.md)\>

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`replaceClient`](ManagementClient.md#replaceclient)

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`replaceDomain`](ManagementClient.md#replacedomain)

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`replaceGroup`](ManagementClient.md#replacegroup)

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

#### Inherited from

[`ManagementClient`](ManagementClient.md).[`replaceList`](ManagementClient.md#replacelist)

***

### restartDns()

> **restartDns**(): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [client/system.ts:180](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L180)

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### runGravity()

> **runGravity**(`options?`): `Promise`\<`string`\>

Defined in: [client/system.ts:173](https://github.com/creeperkatze/pihole-js/blob/6cfe93f5638f202e1b7d798fc2dde7b71b00bfbb/src/client/system.ts#L173)

#### Parameters

##### options?

[`GravityOptions`](../interfaces/GravityOptions.md)

#### Returns

`Promise`\<`string`\>

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

[`ManagementClient`](ManagementClient.md).[`updateBlocking`](ManagementClient.md#updateblocking)

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

[`ManagementClient`](ManagementClient.md).[`withSession`](ManagementClient.md#withsession)
