import * as apisauce from 'apisauce'

import { Api, Options } from './types'
import { createApi, assert, fillRequest } from './util'
import { WikidotUser, SiteMember, WikidotPage } from './structures'

export class Scpper {
  private _api: apisauce.ApisauceInstance
  private _site: Api.site = null
  private _limit: number = 10

  constructor(options: Api.Options = {}) {
    assert(typeof options === 'object', 'options should be an object')

    const api = createApi(options)
    fillRequest(this, api)

    this._api = api

    if (options.limit) this.limit = options.limit
    if (options.site) this.site = options.site
  }

  /**
   * Retrieve a page by id
   * @param id page id
   */
  public getPage(id: string, options: Options.getPage = {}) {
    var res = this.api.get<Api.PageItem>('page', {
      id,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)

      return new WikidotPage(this, response.data);
    })
    return res;
  }

  /**
   * Retrieve a user by id
   * @param id user id
   * @returns {WikidotUser}
   */
  public getUser(id: string, options: Options.getUser = {}) {
    var res = this.api.get<Api.UserItem>('user', {
      id,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)

      return new WikidotUser(this, response.data);
    })
    return res;
  }

  /**
   * Retrieve a SiteMember by id
   * @param id user id
   * @returns {SiteMember}
   */
  public getSiteMember(id: string, options: Options.getUser = {}) {
    var res = this.api.get<Api.UserItem>('user', {
      id,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)

      return new SiteMember(this, ...options.site, response.data);
    })
    return res;
  }

  /**
   * Retrieve up to limit pages from the specified
   * wiki with the name matching title
   * @param search search
   * @param options page search options
   */
  public findPages(search: string, options: Options.findPage = {}) {
    var res = this.api.get<Api.searchPage>('find-pages', {
      title: search,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)

      return response
    })
    return res;
  }

  /**
   * Retrieves up to limit users from the with part of
   * the name matching name
   * @param search search
   * @param options user search options
   * @returns {Map<string, WikidotUser>}
   */
  public findUsers(search: string, options: Options.findUser = {}) {
    var res = this.api.get<Api.searchUser>('find-users', {
      name: search,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)
      let result = new Map()
      for (let user of response.data.users) {
        result.set(user.id,new WikidotUser(this,user));
      }
      return result
    })
    return res;
  }

  /**
   * Retrieves up to limit SiteMembers from the with part of
   * the name matching name
   * @param search search
   * @param options user search options
   * @returns {Map<string, SiteMember>}
   */
  public findSiteMembers(search: string, options: Options.findUser = {}) {
    var res = this.api.get<Api.searchUser>('find-users', {
      name: search,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)
      let result = new Map()
      for (let user of response.data.users) {
        result.set(user.id, new SiteMember(this, ...options.site, user));
      }
      return result
    })
    return res;
  }

  /**
   * Retrieve up to limit pages, selected using provided tags
   * @param tag list of tags, each prefixed with "+" or "-", separated by commas
   * @param options tag search options
   */
  public findTag(tag: string | string[], options: Options.findTag = {}) {
    const search = Array.isArray(tag) ? tag.join(',') : tag

    var res = this.api.get<Api.searchTag>('tags', {
      tags: search,
      ...options
    }).then(response => {

      if (!response.ok) throw new Error(response.problem)

      let result = new Map()
      for (let page of response.data.pages) {
        result.set(page.id,new WikidotPage(this,page));
      }
      return result
    })
    return res;
  }

  /**
   * Retrieve a page by id, as an async method
   * @param id page id
   */
  public async getPageAsync(id: string, options: Options.getPage = {}) {
    var response = await this.api.get<Api.PageItem>('page', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return new WikidotPage(this, response.data);
  }

  /**
   * Retrieve a user by id, as an async method
   * @param id user id
   * @returns {WikidotUser}
   */
  public async getUserAsync(id: string, options: Options.getUser = {}) {
    var response = await this.api.get<Api.UserItem>('user', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return new WikidotUser(this, response.data);
  }

  /**
   * Retrieve a SiteMember by id, as an async method
   * @param id user id
   * @returns {SiteMember}
   */
  public async getSiteMemberAsync(id: string, options: Options.getUser = {}) {
    var response = await this.api.get<Api.UserItem>('user', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return new SiteMember(this, ...options.site, response.data);
  }

  /**
   * Retrieve up to limit pages from the specified, as an async method
   * wiki with the name matching title
   * @param search search
   * @param options page search options
   */
  public async findPagesAsync(search: string, options: Options.findPage = {}) {
    var response = await this.api.get<Api.searchPage>('find-pages', {
      title: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return response
  }

  /**
   * Retrieves up to limit users from the with part of
   * the name matching name, as an async method
   * @param search search
   * @param options user search options
   * @returns {Map<string, WikidotUser>}
   */
  public async findUsersAsync(search: string, options: Options.findUser = {}) {
    var response = await this.api.get<Api.searchUser>('find-users', {
      name: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    let result = new Map()
    for (let user of response.data.users) {
      result.set(user.id,new WikidotUser(this,user));
    }
    return result
  }

  /**
   * Retrieves up to limit SiteMembers from the with part of
   * the name matching name, as an async method
   * @param search search
   * @param options user search options
   * @returns {Map<string, SiteMember>}
   */
  public async findSiteMembersAsync(search: string, options: Options.findUser = {}) {
    var response = await this.api.get<Api.searchUser>('find-users', {
      name: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    let result = new Map()
    for (let user of response.data.users) {
      result.set(user.id, new SiteMember(this, ...options.site, user));
    }
    return result
  }

  /**
   * Retrieve up to limit pages, selected using provided tags, as an async method
   * @param tag list of tags, each prefixed with "+" or "-", separated by commas
   * @param options tag search options
   */
  public async findTagAsync(tag: string | string[], options: Options.findTag = {}) {
    const search = Array.isArray(tag) ? tag.join(',') : tag

    var response = await this.api.get<Api.searchTag>('tags', {
      tags: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    let result = new Map()
    for (let page of response.data.pages) {
      result.set(page.id,new WikidotPage(this,page));
    }
    return result
  }

  /**
   * Internal API object
   */
  get api() {
    return this._api
  }

  /**
   * Scppper item limit
   */
  get limit() {
    return this._limit
  }

  /**
   * Set Scpper item limit
   */
  set limit(limit: number) {
    assert(typeof limit === 'number', 'limit must be a number')

    this._limit = limit
  }

  /**
   * Scpper's search default site
   */
  get site() {
    return this._site
  }

  /**
   * Set default site for Scpper's search
   */
  set site(site: Api.site) {
    // @ts-ignore
    site = site.toLowerCase()

    assert(site in Api.SiteInitial, `${site} is not a valid wiki site`)

    this._site = site
  }

  /**
   * Get API URL
   */
  get url() {
    return this.api.getBaseURL()
  }
}
