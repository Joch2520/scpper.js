
/**
 * Represents a Wikidot user stored on ScpperDB.
 */
class WikidotUser {
  constructor(client, data) {
    /**
     * The client that instantiated this WikidotUser
     * @name WikidotUser#client
     * @type {Scpper}
     * @readonly
     */
    this.client = client;

    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * The wikidot ID of the user, also used by ScpperDB as identifier
     * @type {number}
     */
    this.id = data.id;

    /**
     * The username of the user
     * @type {string}
     */
    this.username = data.username;

    /**
     * The displayed name of the user, with space and special symbols etc.
     * @type {string}
     */
    this.displayName = data.displayName;

    /**
     * Whether the account is deleted or not
     * @type {boolean}
     */
    this.deleted = Boolean(data.deleted);

    /**
     * The branch tags the user is in
     * @type {array<string>}
     */
    this.branches = Object.keys(data.activity);
  }



  patch(data) {
    for (const prop of ['id', 'username', 'displayName']) {
      if (typeof data[prop] !== 'undefined') this[prop] = data[prop];
    }
  };

  /**
   * Checks if the user has joined the specified site/branch or not
   * @param {string} site The site to check if the user is in
   * @returns {boolean}
   */
  get memberOf(site) {
    return Boolean(this.branches.includes(site));
  };
};

module.exports = WikidotUser;
