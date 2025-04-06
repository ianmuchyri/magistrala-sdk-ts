// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  rulesUrl: `${defaultUrl}:9008`,
});

const token = "<token>";
const domainId = "<domainId>";

mgSdk.Rules.CreateRule({ name: "<ruleName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Rules.ListRules({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Rules.ViewRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    console.error(error);
  });

mgSdk.Rules.UpdateRule(
  {
    id: "<ruleId>",
    name: "<updatedName>",
    logic: { type: 1, value: "<value>" },
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

mgSdk.Rules.DeleteRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Rules.DisableRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Rules.EnableRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
