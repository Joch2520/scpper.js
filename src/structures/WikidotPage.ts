import SiteResolvable from "./SiteResolvable";
import {Scpper} from "../Scpper";
import DataResolver from "../DataResolver";
import SiteMember from "./SiteMember";
import {Api} from "../types";

export class WikidotPage implements SiteResolvable {
    /**
     * The client that instantiated this WikidotUser
     * @name WikidotUser#client
     * @type {Scpper}
     * @readonly
     */
    public readonly client: Scpper;
    protected resolver: DataResolver;
    private getAuthorStatus: number = 1;

    /**
     * The branch tag/site inital of the page
     * @type {String}
     */
    public site: string;
    /**
     * Represents the id of the page
     * @type {Number}
     */
    public id: number;
    /**
     * The unix name (url) of the page
     * @type {String}
     */
    public name: string;
    /**
     * The title of the page
     * @type {String}
     */
    public title: string;
    /**
     * The alternative title of the page, only available for SCP articles
     * @type {boolean}
     */
    public altTitle: boolean;
    /**
     * Whether the page is an original or a tranlated work
     * @type {String}
     */
    public status: string;
    /**
     * The kind the page it is, "SCP", "tale", "unknown", etc.
     * @type {String}
     */
    public kind: string;
    /**
     * When the page was created
     * @type {String}
     */
    public created: string
    /**
     * The author(s) of the page
     * @type {Map<Number, SiteMember}
     */
    public authors: Map<number, SiteMember> = new Map<number, SiteMember>();
    /**
     * The translator(s) of the page
     * @type {Map<Number, SiteMember}
     */
    public translators: Map<number, SiteMember> = new Map<number, SiteMember>();
    /**
     * The overall rating of the page
     * @type {Number}
     */
    public rating: number;
    /**
     * The clean rating of the page
     * @type {Number}
     */
    public cleanRating: number;
    /**
     * The contributor rating of the page
     * @type {Number}
     */
    public contributorRating: number;
    /**
     * The adjusted rating of the page
     * @type {Number}
     */
    public adjustedRating: number;
    /**
     * The Wilson score of the page
     * @type {Number}
     */
    public wilson: number;
    /**
     * The rank of the page in the site
     * @type {Number}
     */
    public rank: number;


    constructor(client: Scpper, data: object) {
        this.client = client;
        this.resolver = new DataResolver(client);

        if (data) this.setup(data)
    }

    private async setup(data: object) {
        this.site = this.client.site[data["site"]]
        this.created = data["creationDate"]["data"];

        for (const prop of ['id', 'deleted', 'name', 'title', 'altTitle', 'status', 'kind', 'rank', 'rating', 'cleanRating', 'contributorRating', 'adjustedRating']) {
            if (typeof data[prop] !== ('undefined' || undefined || 'Nan' || NaN || 'null' || null )) this[prop] = data[prop];
        }

        this.wilson = data["wilsonScore"];

        for (const user of data["authors"]) {
            await this.client.getSiteMember(user["id"], {site: Api.SiteInitial[this.site]}).then(
                siteMember => {
                    switch (user["role"]) {
                        case "Author":
                            this.authors[user["id"]] = siteMember;
                            break;
                        case "Translator":
                            this.translators[user["id"]] = siteMember;
                            break;
                    }
                }
            )
        }
    }

    get isOriginal(): boolean {
        return this.status.toLowerCase() === "original"
    }

    get isTranslation(): boolean {
        return this.status.toLowerCase() === "translation"
    }

    get isSCP() {
        return this.kind.toUpperCase() === "SCP"
    }

    get createdAt(): Date {
        return new Date(this.created)
    }
}

export default WikidotPage;