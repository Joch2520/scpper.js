import WikidotUser from "./WikidotUser";
import SiteResolvable from "./SiteResolvable";
import {Scpper} from "../Scpper";

/**
 * Represents a member of an official SCP branch.
 * @extends {WikidotUser}
 * @implements {SiteResolvable}
 */
export default class SiteMember extends WikidotUser implements SiteResolvable {
    /**
     * The site this member is in
     * @type {String}
     */
    public site: string;
    /**
     * The timestamp this member joined the site at
     * @type {String}
     */
    public joinedTimestamp: string;
    /**
     * The timestamp this member was last active on the site at
     * @type {String}
     */
    public lastActive: string;
    /**
     * The total votes this member has voted on the site
     * @type {Number}
     */
    public votes: number;
    /**
     * The total revisions this member has committed on the site
     * @type {Number}
     */
    public revisions: number;
    /**
     * The total pages this member has created on the site
     * @type {Number}
     */
    public pages: number;
    /**
     * The highest rating this member has gotten for a single page on the site
     * @type {Number}
     */
    public highestRating: number;
    /**
     * The total rating this member has gotten for all owned pages on the site
     * @type {Number}
     */
    public totalRating: number;

    constructor(client: Scpper, site: SiteResolvable, data: object) {
        super(client, data);

        this.site = this.resolver.resolveSite(site);

        if (this.memberOf(this.site)) this.construct(data);
    }

    private construct(data: object) {
        let siteActivity = data["activity"][this.site];
        this.joinedTimestamp = siteActivity.member.date;
        this.lastActive = siteActivity.lastActive.date;
        this.votes = siteActivity.votes;
        this.revisions = siteActivity.revisions;
        this.pages = siteActivity.pages;
        this.highestRating = siteActivity.highestRating;
        this.totalRating = siteActivity.totalRating;
    }

    get joinedAt(): Date {
        return new Date(this.joinedTimestamp);
    }

    get lastActiveAt(): Date {
        return new Date(this.lastActive);
    }

    get pageCount(): number {
        return this.pages;
    }
}