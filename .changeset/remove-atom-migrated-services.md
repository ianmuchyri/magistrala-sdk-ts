---
"@absmach/magistrala-sdk": minor
---

Remove the Users, Domains, Groups, Clients, and Channels service modules, and rename Domain to Workspace and Client to Device throughout.

Workspaces, groups, users, devices, and channels are now managed via Atom
over GraphQL rather than this SDK's HTTP methods, so `SDK.Users`,
`SDK.Domains`, `SDK.Groups`, `SDK.Clients`, and `SDK.Channels` — along with
the `Login`/`createToken`/`refreshToken` auth helpers they exposed — have
been removed. `SDKConfig` no longer accepts `usersUrl`, `domainsUrl`,
`groupsUrl`, `clientsUrl`, or `channelsUrl`, and `Health.check` no longer
supports the `"users"`, `"domains"`, `"groups"`, `"clients"`, `"channels"`,
or `"invitations"` services.

Their type definitions are kept and exported, since applications still use
them as the common vocabulary for data now fetched via Atom, and because
they appear embedded in responses from services this SDK continues to
cover (e.g. `created_by` on a Rule, or `channel` on an Alarm). Following the
same rename already applied elsewhere in Magistrala, `Domain` is renamed to
`Workspace` (`DomainBasicInfo` → `WorkspaceBasicInfo`, `DomainsPage` →
`WorkspacesPage`) and `Client` is renamed to `Device` (`ClientBasicInfo` →
`DeviceBasicInfo`, `ClientCredentials` → `DeviceCredentials`, `ClientsPage`
→ `DevicesPage`, `ClientTelemetry` → `DeviceTelemetry`). `domain_id` /
`domain_name` fields become `workspace_id` / `workspace_name` throughout
(matching the backend's own field rename); `client_id`-style reference
fields are unchanged, since the backend kept that field name on the wire.
`Group`, `Channel`, and `User` keep their existing names.
