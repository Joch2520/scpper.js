import WikidotUser from './WikidotUser';

/**
 * Represents a member of an official SCP branch.
 * @extends {WikidotUser}
 */
class SiteMember extends WikidotUser {
  constructor(client, site, data) {
    super(client, data);
    /**
     * The site this member is in
     * @type {String}
     */
    this.site = this._DataResolver.SiteResolver(site);;

    /**
     * The timestamp this member joined the site at
     * @type {String}
     */
    this.joinedTimestamp = null;

    /**
     * The timestamp this member was last active on the site at
     * @type {String}
     */
    this.lastActive = null;

    /**
     * The total votes this member has voted on the site
     * @type {Number}
     */
    this.votes = null;

    /**
     * The total revisions this member has committed on the site
     * @type {Number}
     */
    this.revisions = null;

    /**
     * The total pages this member has created on the site
     * @type {Number}
     */
    this.pages = null;

    /**
     * The highest rating this member has gotten for a single page on the site
     * @type {Number}
     */
    this.highestRating = null;

    /**
     * The total rating this member has gotten for all owned pages on the site
     * @type {Number}
     */
    this.totalRating = null;


    if (this.memberOf(this.site)) this.setup(data);
  }

  setup(data) {
    var siteActivity = data.activity[this.site];
    this.joinedTimestamp = siteActivity.member.date;
    this.lastActive = siteActivity.lastActive.date;
    this.votes = siteActivity.votes;
    this.revisions = siteActivity.revisions;
    this.pages = siteActivity.pages;
    this.highestRating = siteActivity.highestRating;
    this.totalRating = siteActivity.totalRating;
  }

  get joinedAt() {
    return new Date(this.joinedTimestamp)
  }

  get lastActiveAt() {
    return new Date(this.lastActive)
  }

  get pageCount() {
    return this.pages
  }
};

export default SiteMember;
