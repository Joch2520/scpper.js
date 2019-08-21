const branches = ['en', 'ru', 'ko', 'ja', 'fr', 'es', 'th', 'pl', 'de', 'cn', 'it', 'int'];
const branchUrls = {
    "http://www.scp-wiki.net": "en",
    "http://scp-wiki.wikidot.com": "en",
    "http://scpfoundation.ru": "ru",
    "http://scp-ru.wikidot.com": "ru",
    "http://ko.scp-wiki.net": "ko",
    "http://scpko.wikidot.com": "ko",
    "http://ja.scp-wiki.net": "ja",
    "http://scp-jp.wikidot.com": "ja",
    "http://fondationscp.wikidot.com": "fr",
    "http://lafundacionscp.wikidot.com": "es",
    "http://scp-th.wikidot.com": "th",
    "http://scp-wiki.net.pl": "pl",
    "http://scp-pl.wikidot.com": "pl",
    "http://scp-wiki-de.wikidot.com": "de",
    "http://scp-wiki-cn.wikidot.com": "cn",
    "http://fondazionescp.wikidot.com": "it",
    "http://scp-int.wikidot.com": "int"

}

class SCPDataResolver {
  /**
   * @param {Client} client The client the resolver is for
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Data that resolves to give a WikidotUser object. This can be:
   * * A WikidotUser object
   * * A wikidot ID
   * * A SiteMember object
   * * A WikidotPage object (resolves to the page creator)
   * @typedef {WikidotUser|WikidotID|SiteMember|WikidotPage} WikidotUserResolvable
   */

  /**
   * Resolves a WikidotUserResolvable to a User object.
   * @param {WikidotUserResolvable} user The WikidotUserResolvable to identify
   * @returns {?WikidotUser}
   */
  resolveUser(user) {
    if (user instanceof WikidotUser||user instanceof SiteMember) return user;
    if (typeof user === 'string') return this.client.getUser(user) || null;
    if (user instanceof WikidotPage) return user.creator;
    return null;
  }

  /**
   * Resolves a WikidotUserResolvable to a user ID string.
   * @param {WikidotUserResolvable} user The WikidotUserResolvable to identify
   * @returns {?string}
   */
  resolveUserID(user) {
    if (user instanceof WikidotUser || user instanceof SiteMember) return user.id;
    if (typeof user === 'string') return user || null;
    if (user instanceof WikidotPage) return user.creator.id;
    return null;
  }/**
   * Data that resolves to give a Site object. This can be:
   * * A SiteMember object
   * * A WikidotPage object
   * * A site inital
   * @typedef {SiteMember|WikidotPage|Site} SiteResolvable
   */

  /**
   * Resolves a SiteResolvable to a Site object.
   * @param {SiteResolvable} site The SiteResolvable to identify
   * @returns {?string}
   */
  resolveSite(site) {
    if (site instanceof SiteMember || site instanceof WikidotPage) return site.site;
    if (typeof site === 'string'){
      if (branches.includes(site)) return site;
      else if (branchUrls.hasOwnProperty(site)) return branchUrls[site];
    }
    return null;
  }

  /**
   * Data that resolves to give a SiteMember object. This can be:
   * * A SiteMember object
   * * A WikidotUser object
   * @typedef {SiteMember|WikidotUser} SiteMemberResolvable
   */

  /**
   * Resolves a SiteMemberResolvable to a SiteMember object.
   * @param {SiteResolvable} site The Site that the member is part of
   * @param {WikidotUserResolvable} user The user that is part of the Site
   * @returns {?SiteMember}
   */
  resolveSiteMember(site, user) {
    if (user instanceof SiteMember) return user;
    site = this.resolveSite(site);
    user = this.resolveUser(user);
    if (!site || !user) return null;
    return user.client.getSiteMember(user.id, {site:site}) || null;
  }
}

module.exports.DataResolver = SCPDataResolver;
