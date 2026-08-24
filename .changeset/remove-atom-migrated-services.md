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
`WorkspacesPage`, `domain_id`/`domain_name` → `workspace_id`/`workspace_name`)
and `Client` is renamed to `Device` (`ClientBasicInfo` → `DeviceBasicInfo`,
`ClientCredentials` → `DeviceCredentials`, `ClientsPage` → `DevicesPage`,
`ClientTelemetry` → `DeviceTelemetry`), including the `client`/`client_id`
reference fields embedded in `Alarm`, `AlarmPageMeta`, `Metric`, `ReqMetric`,
`Cert`, `BootstrapConfig`, `DeviceTelemetry`, and the generic `PageMetadata`
filter (e.g. `Alarm.client_id` → `Alarm.device_id`, `DevicesPage.clients` →
`DevicesPage.devices`, `ReqMetric.client_ids` → `ReqMetric.device_ids`,
`Cert.client_cert`/`client_key` → `device_cert`/`device_key`). The
`Certs.listByClient` and `Journal.clientTelemetry` methods are renamed to
`listByDevice` and `deviceTelemetry` to match, with their parameters renamed
from `clientId` to `deviceId`.

This rename covers the SDK's type surface, exported names, and internal
parameter/variable naming. It does not touch literal values that are sent
over the wire to the current backend as-is — the bootstrap service's
`clients/...` endpoint paths, the `Client `/`Bearer ` Authorization scheme
prefixes, and a couple of untyped `client_id` values still written into
outgoing request bodies — since the backend still expects those exact
strings today; changing them would silently break real requests rather than
just renaming a label.

`Group`, `Channel`, and `User` keep their existing names.
