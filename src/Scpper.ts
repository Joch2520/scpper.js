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
  public async getPage(id: string, options: Options.getPage = {}): Promise<WikidotPage> {
    var response = await this.api.get<Api.PageItem|Api.Error>('page', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    return new WikidotPage(this, response.data);
  }

  /**
   * Retrieve a user by id
   * @param id user id
   */
  public async getUser(id: string, options: Options.getUser = {}): Promise<WikidotUser> {
    var response = await this.api.get<Api.UserItem|Api.Error>('user', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    return new WikidotUser(this, response.data);
  }

  /**
   * Retrieve a SiteMember by id
   * @param id user id
   */
  public async getSiteMember(id: string, options: Options.getUser = {}): Promise<SiteMember> {
    var response = await this.api.get<Api.UserItem|Api.Error>('user', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    return new SiteMember(this, options.site, response.data);
  }

  /**
   * Retrieve up to limit page from the specified
   * wiki with the name matching title
   * @param search search
   * @param options page search options
   */
  public async findPages(search: string, options: Options.findPage = {}): Promise<Map<number, WikidotPage>> {
    var response = await this.api.get<Api.searchPage|Api.Error>('find-pages', {
      title: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    let result = new Map()
    for (let page of (response.data as Api.searchPage).pages) {
      result.set(page.id, new WikidotPage(this,page));
    }
    return result
  }

  /**
   * Retrieves up to limit users from the specified
   * wiki with part of the name matching search string
   * @param search search
   * @param options user search options
   */
  public async findUsers(search: string, options: Options.findUser = {}): Promise<Map<number, WikidotUser>> {
    var response = await this.api.get<Api.searchUser|Api.Error>('find-users', {
      name: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    let result = new Map()
    for (let user of (response.data as Api.searchUser).users) {
      result.set(user.id, new WikidotUser(this,user));
    }
    return result
  }

  /**
   * Retrieves up to limit users from the specified
   * wiki with part of the name matching search string
   * @param search search
   * @param options user search options
   * @returns {Map<string, SiteMember>}
   */
  public async findSiteMembers(search: string, options: Options.findUser = {}): Promise<Map<number, SiteMember>> {
    var response = await this.api.get<Api.searchUser|Api.Error>('find-users', {
      name: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    let result = new Map()
    for (let user of (response.data as Api.searchUser).users) {
      result.set(user.id, new SiteMember(this, options.site, user));
    }
    return result
  }

  /**
   * Retrieve up to limit pages, selected using provided tags
   * @param tag list of tags, each prefixed with "+" or "-", separated by commas
   * @param options tag search options
   */
  public async findTag(tag: string | string[], options: Options.findTag = {}): Promise<Map<number, WikidotPage>> {
    const search = Array.isArray(tag) ? tag.join(',') : tag

    var response = await this.api.get<Api.searchTag|Api.Error>('tags', {
      tags: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)
    if ((response.data as Api.Error).error!==undefined) throw new Error((response.data as Api.Error).error)

    let result = new Map()
    for (let page of (response.data as Api.searchTag).pages) {
      result.set(page.id, new WikidotPage(this,page));
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
