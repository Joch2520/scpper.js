import {Scpper} from "../Scpper";
import DataResolver from "../DataResolver";
import SiteResolvable from "./SiteResolvable";

/**
 * Represents a Wikidot user stored on ScpperDB.
 */
export default class WikidotUser {
    /**
     * The client that instantiated this WikidotUser
     * @name WikidotUser#client
     * @type {Scpper}
     * @readonly
     */
    public readonly client: Scpper;
    protected resolver: DataResolver;

    /**
     * The wikidot ID number of the user, also used by ScpperDB as identifier
     * @type {number}
     */
    public id: number;
    /**
     * The username of the user
     * @type {string}
     */
    public name: string;
    /**
     * The displayed name of the user, with space and special symbols etc.
     * @type {string}
     */
    public displayName: string;
    /**
     * Whether the account is deleted or not
     * @type {boolean}
     */
    public deleted: boolean;
    /**
     * The branch tags the user is in
     * @type {array<string>}
     */
    public branches: Array<string>;
    /**
     * The activity on which the branches the user is in
     * @type {array<string>}
     */
    public activity: Array<string>;

    constructor(client: Scpper, data: object) {
        this.client = client;
        this.resolver = new DataResolver(client);

        if (data) this.setup(data)
    }

    private setup(data: object) {
        for (const prop of ["id", "name", "displayName", "deleted", "branches", "activity"]) {
            if (typeof data[prop] !== ('undefined' || undefined || 'Nan' || NaN || 'null' || null )) this[prop] = data[prop];
        }
    }

    /**
     * Replace properties with provided object
     * This allows to replace user's id, name, and displayName
     * @param {Object} data Object to patch with
     */
    public patch(data: object) {
        for (const prop of ['id', 'name', 'displayName']) {
            if (typeof data[prop] !== 'undefined') this[prop] = data[prop];
        }
    }

    /**
     * Checks if the user has joined the specified site/branch or not
     * @param {string} site The site to check if the user is in
     * @returns {boolean}
     */
    public memberOf(site: string = null): boolean {
        let resolvedSite = this.resolver.resolveSite(site);
        return this.branches.includes(resolvedSite);
    }

    /**
     * Checks if the user has joined the specified site/branch or not
     * @param {SiteResolvable} resolvable The site to check if the user is in
     * @returns {boolean}
     */
    public isInSite(resolvable: SiteResolvable): boolean {
        return this.branches.includes(resolvable.site);
    }
}
