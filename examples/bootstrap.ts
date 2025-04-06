// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  bootstrapUrl: `${defaultUrl}:9013`,
});

const token = "<token>";
const domainId = "<domainId>";

mgSdk.Bootstrap.AddBootstrap(
  {
    external_id: "<externalId>",
    external_key: "externalKey",
    client_id: "<clientId>",
    name: "<bootstrapName>",
  },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.Whitelist(
  {
    external_id: "<externalId>",
    external_key: "<externalKey>",
    client_id: "<clientId>",
    name: "<bootstrapName>",
  },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.UpdateBootstrap(
  {
    name: "<updatedBootstrapName>",
    client_id: "<clientId>",
  },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.ViewBootstrap("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.UpdateBootstrapCerts(
  {
    client_id: "<clientId>",
    client_cert: "<clientCert>",
    client_key: "<clientKey>",
    ca_cert: "<caCert>",
  },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.DeleteBootstrap("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.Bootstrap("externalId", "externalKey")
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.Bootstraps({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.UpdateBootstrapConnection(
  "<clientId>",
  domainId,
  ["<channelId>", "<channelId2>"],
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Bootstrap.SecureBootstrap("<externalId>", "<externalKey>", "<cryptoKey>")
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });
