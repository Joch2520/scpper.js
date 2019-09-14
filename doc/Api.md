# API Documentaion

Available APIs:
[api.getPage()](#get+stuff)
[api.getUser()](#get+stuff)
[api.getSiteMember()](#get+stuff)
[api.findPages()](#find+pages)
[api.findUsers()](#find+users)
[api.findSiteMembers()](#find+site+members)
[api.findTag()](#find+tag)

[Changes to response](#response)

Any of the above can be used in async by adding `Async` after the method name: i.e. api.getPageAsync(), etc.

For structures of the class objects that some methods would return, please see the [Structures Documentaion](Structures.md).

<a id="get+stuff"></a>

## api.getPage(), api.getUser()

`getPage` and `getUser` accept 1 parameter:

id - string - the id of the requested ressource, wikidot user ID or user page ID (required)

Respectively returns: a [WikidotPage](Structures#wikidot+page) object, a [WikidotUser](Structures.md#wikidot+user) object

<a id="get+site+member"></a>

## api.getSiteMember()

`getSiteMember` accepts 2 parameters:

id - string - the id of the requested ressource, wikidot user ID or user page ID (required)

site - the specific site of the user as a member of (required)

Returns: a [SiteMember](Structures.md#site+member) object.

<a id="find+page"></a>

## api.findPages()

```js
api.findPages('scp-002')
```

`findPages` accept 2 parameters:

search - the name of the page you are looking for in ScpperDB (required)

options - Object (optional)

- `site` - Overwrite site property for this request (optional)
- `limit` - Overwrite limit property for this request (optional)
- `random` - boolean - indicating whether resulting list of pages should be randomized (optional)

Returns: a Map of [WikidotPage](Structures#wikidot+page) objects, mapped by their ids.

<a id="find+users"></a>

## api.findUsers()

```js
api.findUsers('Anqxyr')
```

`findUsers` accept 2 parameters:

search - the name of the user you are looking for in ScpperDB (required)

options - Object (optional)

- `site` - Overwrite site property for this request (optional)
- `limit` - Overwrite limit property for this request (optional)

Returns: a Map of [WikidotUser](Structures#wikidot+user) objects, mapped by their ids.

<a id="find+site+members"></a>

## api.findSiteMembers()

```js
api.findSiteMembers('Anqxyr', 'en')
```

`findSiteMembers` accept 3 parameters:

search - the name of the user you are looking for in ScpperDB (required)

site - the specific site of the user as a member of (required)

options - Object (optional)

- `limit` - Overwrite limit property for this request (optional)

Returns: a Map of [SiteMember](Structures#site+member) objects, mapped by their ids.

<a id="find+tag"></a>

## api.findTag()

```js
api.findTag('+keter')
// or
api.findTag(['-keter', '+euclide'])
```

tag - string or array - the tag search you want to perform (required)

options - Object (optional)

- `site` - Overwrite site property for this request (optional)
- `limit` - Overwrite limit property for this request (optional)
- `method` - ("and"|"or") - How to combine provided tags for the query (optional)
- `random` - boolean - indicating whether resulting list of pages should be randomized (optional)

> The list of tags (array) must be prefixed with "+" or "-"
> "+" indicates that pages containing this tag must be included in the query
> "-" indicates that pages containing this tag must be excluded from the query
> Each tag MUST be prefixed by only ONE of those options.

You can also change "site" property, which is the abbreviation of the site whose data you want to use with a valid initial, otherwise, it will throw an error.

```js
api.site = 'fr'

api.site = 'ca'
// Error: ca is not a valid wiki site
```

Returns: a Map of [WikidotPage](Structures#wikidot+page) objects, mapped by their ids.

<a id="response"></s>

### Response

Different from HelloEdit's version of scpper.js, what synced methods return are object-based, with custom defined classes.
With async methods, a promise will be returned containing the object of the same response as its synced counterpart.

For structures, please refer to the [Structures Documentaion](Structures.md).

```js
api.findPages('173')
```

To see in detail what each method returns, [see this page](https://github.com/FiftyNine/ScpperDB#api).

The promised is resolved if no error has occurred (see below).

```
Constant        VALUE               Status Code   Explanation
----------------------------------------------------------------------------------------
NONE             null               200-299       No problems. The promise is resolved.
CLIENT_ERROR     'CLIENT_ERROR'     400-499       Any non-specific 400 series error.
SERVER_ERROR     'SERVER_ERROR'     500-599       Any 500 series error.
TIMEOUT_ERROR    'TIMEOUT_ERROR'    ---           Server didn't respond in time.
CONNECTION_ERROR 'CONNECTION_ERROR' ---           Server not available, bad dns.
NETWORK_ERROR    'NETWORK_ERROR'    ---           Network not available.
CANCEL_ERROR     'CANCEL_ERROR'     ---           Request has been cancelled. Only possible if `cancelToken` is provided in config, see axios `Cancellation`.
```

A response will always have these 2 properties:

```
ok      - Boolean - True is the status code is in the 200's; false otherwise.
problem - String  - One of 6 different values (see problem codes)
```

If the response don't have ok true, the promise will be rejected.

If the request made it to the server and got a response of any kind, response will also have these properties:

```
data     - Object - this is probably the thing you're after, with the response of the Scpper.
status   - Number - the HTTP response code
headers  - Object - the HTTP response headers
config   - Object - the `axios` config object used to make the request
duration - Number - the number of milliseconds it took to run this request
```

> From [api-sauce](https://github.com/infinitered/apisauce)
