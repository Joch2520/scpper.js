const util_1 = require("./util");
const SiteMember = require("./SiteMember");
const DataResolver = require("./../DataResolver");

class WikidotPage {
  constructor(client, data) {

    this._DataResolver = new DataResolver.SCPDataResolver(client)
    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * Represents the id of a Wikidot page stored on ScpperDB
     * @type {number}
     */
    this.id = data.id;

    /**
     * The branch tag/site inital of the page
     * @type {string}
     */
    this.site = this._DataResolver.SiteResolver(data.site);
  }
};

module.exports.WikidotPage = WikidotPage
