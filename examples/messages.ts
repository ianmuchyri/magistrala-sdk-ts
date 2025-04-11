// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  httpAdapterUrl: `${defaultUrl}:8008`,
  readersUrl: `${defaultUrl}:9011`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.messages
  .Send(domainId, "<topic>", "<secret>", "<message>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.messages
  .Read({ offset: 0, limit: 10 }, "<channelId>", token, "<domainId>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
