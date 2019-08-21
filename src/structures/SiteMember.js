const util_1 = require("./util");
const WikidotUser = require('./WikidotUser');

/**
 * Represents a member of an official SCP branch.
 * @extends {WikidotUser}
 */
class SiteMember extends WikidotUser {
  constructor(client, site, data) {
    super(client, data);
    /**
     * The site this member is in
     * @type {string}
     */
    this.site = site;

    /**
     * The timestamp this member joined the site at
     * @type {string}
     */
    this.joinedTimestamp = null;

    /**
     * The timestamp this member was last active on the site at
     * @type {string}
     */
    this.lastActive = null;

    /**
     * The total votes this member has voted on the site
     * @type {number}
     */
    this.votes = null;

    /**
     * The total revisions this member has committed on the site
     * @type {number}
     */
    this.revisions = null;

    /**
     * The total pages this member has created on the site
     * @type {number}
     */
    this.pages = null;

    /**
     * The highest rating this member has gotten for a single page on the site
     * @type {number}
     */
    this.highestRating = null;

    /**
     * The total rating this member has gotten for all owned pages on the site
     * @type {number}
     */
    this.totalRating = null;


    if (this.memberOf(site)) this.setup(data);
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

  get lastActive() {
    return new Date(this.lastActive)
  }

  get id() {
    return this.id
  }

  get votes() {
    return this.votes
  }

  get pageCount() {
    return this.pages
  }

  get highestRating() {
    return this.highestRating
  }

  get totalRating() {
    return this.totalRating
  }
};

module.exports.SiteMember = SiteMember;
