---
"@absmach/magistrala-sdk": minor
---

Remove the Users, Domains, Groups, Clients, and Channels modules.

These entities are now served by Atom over GraphQL and no longer expose a
Magistrala HTTP API, so `SDK.Users`, `SDK.Domains`, `SDK.Groups`,
`SDK.Clients`, and `SDK.Channels` — along with their types (`User`, `Client`,
`Group`, `Channel`, `Domain` and their page/credentials/invitation variants)
and the `Login`/`Token`/`RefreshToken` auth helpers — have been removed.
`SDKConfig` no longer accepts `usersUrl`, `domainsUrl`, `groupsUrl`,
`clientsUrl`, or `channelsUrl`, and `Health.check` no longer supports the
`"users"`, `"domains"`, `"groups"`, `"clients"`, `"channels"`, or
`"invitations"` services.

The lightweight `UserBasicInfo`, `ClientBasicInfo`, `ChannelBasicInfo`, and
`DomainBasicInfo` reference types are kept, since they still appear embedded
in responses from services this SDK continues to cover (e.g. `created_by` on
a Rule, or `channel` on an Alarm).
