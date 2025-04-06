// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  clientsUrl: `${defaultUrl}:9006`,
});

const token = "<token>";
const domainId = "<domainId>";

mgSdk.Clients.CreateClient({ name: "<clientName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.Disable("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.Enable("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.UpdateClient(
  { id: "<clientId>", name: "<clientName>" },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.UpdateClientSecret(
  { id: "<clientId>", credentials: { secret: "newSecret" } },
  domainId,
  token
)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.UpdateClientTags(
  { id: "<clientId>", tags: ["<tag1>", "<tag2>"] },
  domainId,
  token
)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.Clients({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.Client("<clientId>", domainId, token, false)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteClient("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.setClientParentGroup(
  domainId,
  "<clientId>",
  "<parentGroupId>",
  token
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteClientParentGroup(domainId, "<clientId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.CreateClients(
  [{ name: "<clientName1>" }, { name: "<clientName2>" }],
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.ListClientActions(domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.CreateClientRole("<clientId>", "<roleName>", domainId, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.ListClientRoles(
  "<clientId>",
  domainId,
  { offset: 0, limit: 10 },
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.ViewClientRole("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.UpdateClientRole(
  "<clientId>",
  domainId,
  "<roleId>",
  { name: "<updatedRoleName>" },
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteClientRole("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.AddClientRoleActions(
  "<clientId>",
  domainId,
  "<roleId>",
  ["<action>", "<action>"],
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.ListClientRoleActions("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteClientRoleActions(
  "<clientId>",
  domainId,
  "<roleId>",
  ["<action>", "<action>"],
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteAllClientRoleActions(
  "<clientId>",
  domainId,
  "<roleId>",
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.AddClientRoleMembers(
  "<clientId>",
  domainId,
  "<roleId>",
  ["<userId>", "<userId>"],
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.ListClientRoleMembers(
  "<clientId>",
  domainId,
  "<roleId>",
  { offset: 0, limit: 10 },
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteClientRoleMembers(
  "<clientId>",
  domainId,
  "<roleId>",
  ["<userId>", "<userId>"],
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.DeleteAllClientRoleMembers(
  "<clientId>",
  domainId,
  "<roleId>",
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Clients.ListClientMembers(
  "<clientId>",
  domainId,
  { offset: 0, limit: 10 },
  token
)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
