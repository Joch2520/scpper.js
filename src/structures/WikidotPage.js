const SiteMember = require("./SiteMember");
const DataResolver = require("./../DataResolver");

/**
 * Represents a Wikidot page stored on ScpperDB.
 */
class WikidotPage {
  constructor(client, data) {
    this._client = client;
    this._DataResolver = new DataResolver(client);

    /**
     * The branch tag/site inital of the page
     * @type {string}
     */
    this.site = null

    /**
     * The unix name (url) of the page
     * @type {string}
     */
    this.name = null;

    /**
     * The title of the page
     * @type {string}
     */
    this.title = null;

    /**
     * The alternative title of the page, only available for SCP articles
     * @type {boolean}
     */
    this.altTitle = null;

    /**
     * Whether the page is an original or a tranlated work
     * @type {string}
     */
    this.status = null;

    /**
     * The kind the page it is, only "SCP" or "unknown"
     * @type {string}
     */
    this.kind = null;

    /**
     * When the page was created
     * @type {Date}
     */
    this.created = null;

    /**
     * The author(s) of the page
     * @type {Map<number, SiteMember}
     */
    this.authors = new Map();

    /**
     * The translator(s) of the page
     * @type {Map<number, SiteMember}
     */
    this.translators = new Map();

    /**
     * The overall rating of the page
     * @type {number}
     */
    this.rating = null;

    /**
     * The clean rating of the page
     * @type {number}
     */
    this.cleanRating = null;

    /**
     * The contributor rating of the page
     * @type {number}
     */
    this.contributorRating = null;

    /**
     * The adjusted rating of the page
     * @type {number}
     */
    this.adjustedRating = null;

    /**
     * The Wilson score of the page
     * @type {number}
     */
    this.wilson = null;

    /**
     * The rank of the page in the site
     * @type {number}
     */
    this.rank = null;

    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * Represents the id of the page
     * @type {number}
     */
    this.id = data.id;

    this.deleted = Boolean(data.deleted);
    this.site = this._DataResolver.SiteResolver(data.site);

    this.created = data.creationDate.date;

    for (const prop of ['name', 'title', 'altTitle', 'status', 'kind', 'rank', 'rating', 'cleanRating', 'contributorRating', 'adjustedRating']) {
      if (typeof data[prop] !== 'undefined') this[prop] = data[prop];
    }

    this.wilson = data.wilsonScore;


    for (user of data.authors) {
      var siteMember = this._client.getUser(user.id);
      var siteMemberObj = new SiteMember(this._client, this.site, siteMember);

      if (user.role === "Author") {
        this.authors.set(user.id,siteMemberObj)
      } else if (user.role === "Translator") {
        this.translators.set(user.id,siteMemberObj)
      }
    }
  }

  get isOriginal() {
    if (this.status.toLowerCase === "original") return true; else return false;
  }

  get isTranslation() {
    if (this.status.toLowerCase === "translation") return true; else return false;
  }

  get isSCP() {
    if (this.kind.toUpperCase === "SCP") return true; else return false;
  }

  get createdAt() {
    return new Date(this.created)
  }
};

module.exports = WikidotPage
