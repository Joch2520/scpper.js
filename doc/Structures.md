# Structure Reference

Structures:
[WikidotUser](#wikidot+user)
[SiteMember](#site+member)
[WikidotPage](#wikidot+page)

<a id="wikidot+user"></a>

## WikidotUser

Constructor: WikidotUser(client, data)

| Property | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| id | <code>Number</code> | / | The wikidot ID number of the user, also used by ScpperDB as identifier. |
| username | <code>String</code> | / | The username of the user. |
| displayedName | <code>String</code> | / | The displayed name of the user, with space and special symbols etc. |
| deleted | <code>Boolean</code> | / | Whether the account is deleted or not. |
| branches | <code>Array</code> of <code>String</code> | / | The branch tags the user is in. Called <code>activity</code> in original ScpperDB response. |

| Method | Type | Return type | Description |
| ---- | ---- | ---- | ---- |
| memberOf(site) | sync | <code>Boolean</code> | Accpets param `site`: <code>String</code>. Whether the user is in the specified branch/site or not. |

<a id="site+member"></a>

## SiteMember: extends WikidotUser

Constructor: SiteMember(client, site, data)

| Property | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| those of [WikidotUser](#wikidot+user) | / | / | / |
| site | <code>String</code> | Same as param <code>site</code> | Param <code>site</code> provided in constructor resolved to site initial/branch tag. |
| joinedTimestamp | <code>String</code> | null | The timestamp this member joined the site at. |
| lastActive | <code>String</code> | null | The timestamp this member was last active on the site at. |
| votes | <code>Number</code> | null | The total votes this member has voted on the site. |
| revisions | <code>Number</code> | null | The total revisions this member has committed on the site. |
| pages | <code>Number</code> | null | The total pages this member has created on the site. |
| totalRating | <code>Number</code> | null | The total rating this member has gotten for all owned pages on the site. |
| highestRating | <code>Number</code> | null | The highest rating this member has gotten for a single page on the site. |

| Method | Type | Return type | Description |
| ---- | ---- | ---- | ---- |
| joinedAt() | sync | <code>Date</code> | The property <code>joinedTimestamp</code> as a <code>Date</code> object. |
| lastActiveAt() | sync | <code>Date</code> | The property <code>lastActive</code> as a <code>Date</code> object. |

<a id="wikidot+page"></a>

## WikidotPage

Constructor: WikidotPage(client, data)

| Property | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| id | <code>Number</code> | / | The id of the page. |
| site | <code>String</code> | <code>null</code> | The branch tag/site inital of the page. |
| name | <code>String</code> | <code>null</code> | The unix name (url) of the page. |
| title | <code>String</code> | <code>null</code> | The title of the page. |
| altTitle | <code>String</code> | <code>null</code> | The alternative title of the page, only available for SCP articles. |
| deleted | <code>Boolean</code> | / | Whether the page is deleted or not. |
| status | <code>String</code> | <code>null</code> | Whether the page is an original or a tranlated work. |
| kind | <code>String</code> | <code>null</code> | The kind the page it is, "SCP", "tale", "unknown", etc. |
| created | <code>Date</code> | <code>null</code> | When the page was created. Originally is property <code>creationDate.date</code> in ScpperDB response. |
| authors | <code>Map</code> of <code>Number</code>, <code>SiteMember</code> | empty <code>Map</code> | The author(s) of the page. |
| translators | <code>Map</code> of <code>Number</code>, <code>SiteMember</code> | empty <code>Map</code> | The author(s) of the page. |
| rating | <code>Number</code> | <code>null</code> | The overall rating of the page. |
| cleanRating | <code>Number</code> | <code>null</code> | The clean rating of the page. |
| contributorRating | <code>Number</code> | <code>null</code> | The contributor rating of the page. |
| adjustedRating | <code>Number</code> | <code>null</code> | The adjusted rating of the page. |
| wilson | <code>Number</code> | <code>null</code> | The Wilson Score of the page. Originally named `wilsonSocre` in the ScpperDB response. |
| rank | <code>Number</code> | <code>null</code> | The rank of the page in the site. |

| Method | Type | Return type | Description |
| ---- | ---- | ---- | ---- |
| isOriginal() | sync | <code>Boolean</code> | Checks if lowercase of <code>status</code> equals `<code>original</code>`. |
| isTranslation() | sync | <code>Boolean</code> | Checks if lowercase of <code>status</code> equals `<code>translation</code>`. |
| isSCP() | sync | <code>Boolean</code> | Checks if lowercase of <code>kind</code> equals `<code>scp</code>`. |
| createdAt() | sync | <code>Date</code> | Returns the data of property <code>created</code> as a <code>Date</code> object. |
