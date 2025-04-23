// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  rulesUrl: `${defaultUrl}:9008`,
});

const token = "<token>";
const domainId = "<domainId>";

mgSdk.Reports.generateReport(domainId, { name: "configName" }, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.addReportConfig(domainId, { name: "configName" }, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.viewReportConfig(domainId, "<configId>", token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.listReportConfigs(domainId, { offset: 0, limit: 10 }, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.updateReportConfig(
  domainId,
  { id: "<ruleId>", name: "<updatedName>" },
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.deleteReportConfig(domainId, "<configId>", token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.enableReportConfig(domainId, "<configId>", token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.disableReportConfig(domainId, "<configId>", token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mgSdk.Reports.downloadReport(domainId, "<reportId>", token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });
