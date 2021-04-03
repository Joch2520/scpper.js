<h1 align="center">
  Scpper2.js
  <h4 align="center">NodeJS API wrapper for ScpperDB API</h4>
  <h5 align="center"> Based on HelloEdit's <a href="https://github.com/HelloEdit/scpper.js">Scpper.js</a> </h5>
  <br>
</h1>


<!--
<p align="center">
  <a href='https://coveralls.io/github/HelloEdit/scpper.js?branch=master'><img src='https://coveralls.io/repos/github/HelloEdit/scpper.js/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://travis-ci.org/HelloEdit/scpper.js"><img src="https://travis-ci.org/HelloEdit/scpper.js.svg?branch=master" alt="Travis CI - scpper.js"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="Semantic Release"></a>
</p>
-->

## What the fuck is this ?

> The SCP Foundation is a fictional organization that is the subject of a web-based collaborative writing project of the same name. The stories generated by the project describe the exploits of the Foundation, supposedly responsible for containing individuals, entities, locations, and objects that violate natural law (referred to as SCPs).

This module has been built to communicate and retrieve information from the [Scpper project](https://github.com/FiftyNine/ScpperDB), which is the centralization of data and page's statistics From all branches of the Foundation.

## Documentation

### Create an instance of Scpper

You create an instance of Scpper by calling `new Scpper()` and passing in a configuration object

```js
const api = new Scpper({ site: 'en' })
```

You [**must pass a valid abbreviation**](https://github.com/HelloEdit/scpper.js/blob/dev/src/types/Api.ts#L12) to "site" otherwise, an exception will be throw. Scpper class also accepts as property `limit`, which defines how many items the API should return for queries, and `baseUrl` if you want to use your own Scpper installation.

The Scpper class also accepts as second parameter an [Axios configuration object](https://github.com/axios/axios#request-config)(optional).

### Calling the Scpper API

You can call different API methods of Scpper class like this:

```js
api.getPage('1956234')
api.getUser('966960')
```
[Click here to see the full API documentation.](doc/Api.md)

---

List of available sites (API names in quotes) from [ScpperDB](https://github.com/FiftyNine/ScpperDB#list-of-available-sites-api-names-in-quotes):

- [SCP Foundation](scp-wiki.net): "en"
- [Russian branch](scpfoundation.ru): "ru"
- [Korean branch](ko.scp-wiki.net): "ko"
- [Japanese branch](ja.scp-wiki.net): "ja"
- [French branch](fondationscp.wikidot.com): "fr"
- [Spanish branch](lafundacionscp.wikidot.com): "es"
- [Thai branch](scp-th.wikidot.com): "th"
- [Polish branch](scp-wiki.net.pl): "pl"
- [German branch](scp-wiki-de.wikidot.com): "de"
- [Chinese branch](scp-wiki-cn.wikidot.com): "cn"
- [Italian branch](fondazionescp.wikidot.com): "it"
- [International Archive](http://scp-int.wikidot.com): "int"
- [Traditional Chinese branch](http://scp-zh-tr.wikidot.com): "zh"

SCP Foundation and all related works were created by SCP creative community and are available under CC BY-SA 3.0 license.

### Thanks

Thanks to [HelloEdit](https://github.com/HelloEdit), who has created the [Scpper.js](https://github.com/HelloEdit/scpper.js) that I've modified based off of.
