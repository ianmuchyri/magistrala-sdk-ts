// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  journalUrl: `${defaultUrl}:9021`,
  httpAdapterUrl: `${defaultUrl}/http`,
  readersUrl: `${defaultUrl}:9011`,
  certsUrl: `${defaultUrl}:9019`,
  bootstrapUrl: `${defaultUrl}:9013`,
});

// Bootstrap service Health
mgSdk.Health.check("bootstrap")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Certs service Health
mgSdk.Health.check("certs")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Reader service Health
mgSdk.Health.check("reader")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Http Adapter service Health
mgSdk.Health.check("http-adapter")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Journal service Health
mgSdk.Health.check("journal")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
