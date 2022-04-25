import * as apisauce from 'apisauce'

import { Options } from './Options'

export namespace Api {
  export type site = keyof typeof SiteInitial

  export interface Options
    extends Partial<apisauce.ApisauceConfig>,
      Options.Default {}

  export enum SiteInitial {
    en = 'en',
    ru = 'ru',
    ko = 'ko',
    ja = 'ja',
    jp = 'ja',
    fr = 'fr',
    es = 'es',
    th = 'th',
    pl = 'pl',
    de = 'de',
    cn = 'cn',
    it = 'it',
    zh = 'zh',
    vn = 'vn',
    int = 'int'
  }

  export enum SiteUrl {
    en = 'scpwiki.com',
    ru = 'scpfoundation.ru',
    ko = 'ko.scp-wiki.net',
    ja = 'ja.scp-wiki.net',
    jp = 'ja.scp-wiki.net',
    fr = 'fondationscp.wikidot.com',
    es = 'lafundacionscp.wikidot.com',
    th = 'scp-th.wikidot.com',
    pl = 'scp-wiki.net.pl',
    de = 'scp-wiki-de.wikidot.com',
    cn = 'scp-wiki-cn.wikidot.com',
    it = 'fondazionescp.wikidot.com',
    zh = 'scp-zh-tr.wikidot.com',
    vn = 'scp-vn.wikidot.com',
    int = 'scp-int.wikidot.com'
  }

  export enum SiteWikidotName {
    en = 'scp-wiki',
    ru = 'scp-ru',
    ko = 'scp-ko',
    ja = 'scp-jp',
    jp = 'scp-jp',
    fr = 'fondationscp',
    es = 'lafundacionscp',
    th = 'scp-th',
    pl = 'scp-pl',
    de = 'scp-wiki-de',
    cn = 'scp-wiki-cn',
    it = 'fondazionescp',
    zh = 'scp-zh-tr',
    vn = 'scp-vn',
    int = 'scp-int'
  }

  export type searchPage = {
    pages: PageItem[]
  }

  export type searchUser = {
    users: UserItem[]
  }

  export type searchTag = searchPage

  export interface AuthorField {
    user: string
    role: string
    id?: number
  }

  export interface PageItem {
    id: number
    site: string
    name: string
    title: string
    altTitle: null | string
    status: 'Translation' | 'Original'
    kind: 'SCP' | 'Unknown'
    creationDate: DateField
    rating: number
    cleanRating: number
    contributorRating: number
    adjustedRating: number
    wilsonScore: number
    rank: number
    authors: AuthorField[]
    deleted: boolean
  }

  export interface UserItem {
    id: number
    name: string
    displayName: string
    deleted: number
    activity: Record<string, ActivityField>
  }

  export interface ActivityField {
    votes: number
    revisions: number
    pages: number
    lastActive?: DateField
    member: DateField
    highestRating?: number
    totalRating?: number
  }

  export interface DateField {
    date: string
    timezone_type: number
    timezone: string
  }

  export interface Error {
    error: string
  }
}
