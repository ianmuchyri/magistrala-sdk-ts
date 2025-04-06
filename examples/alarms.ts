// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  alarmsUrl: `${defaultUrl}:8050`,
});

const token = "<token>";
const domainId = "<domainId>";

mgSdk.Alarms.create(
  { rule_id: "<rule_id>", message: "<message>" },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error("Error creating alarm: ", error);
  });

mgSdk.Alarms.list(
  {
    offset: 0,
    limit: 10,
  },
  domainId,
  token
)
  .then((alarmsPage: any) => {
    console.log("List of alarms:", alarmsPage);
  })
  .catch((error) => {
    console.error("Error listing alarms:", error);
  });

mgSdk.Alarms.view("<alarm_id>", domainId, token)
  .then((alarm: any) => {
    console.log("Alarm details:", alarm);
  })
  .catch((error) => {
    console.error("Error viewing alarm:", error);
  });

mgSdk.Alarms.update(
  { rule_id: "<rule_id>", message: "<message>" },
  domainId,
  token
)
  .then((response: any) => {
    console.log("Updated alarm:", response);
  })
  .catch((error) => {
    console.error("Error updating alarm:", error);
  });

mgSdk.Alarms.delete("<alarm_id>", domainId, token)
  .then((res: any) => {
    console.log("Delete response:", res);
  })
  .catch((error) => {
    console.error("Error deleting alarm:", error);
  });
