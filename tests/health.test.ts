// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK from "../src/sdk";
import type { HealthInfo } from "../src/sdk";

enableFetchMocks();

const certsUrl = "http://localhost";
const readersUrl = "http://localhost";
const httpAdapterUrl = "http://localhost";
const bootstrapUrl = "http://localhost";
const journalUrl = "http://localhost";

const sdk = new SDK({
  certsUrl,
  readersUrl,
  httpAdapterUrl,
  bootstrapUrl,
  journalUrl,
});

describe("Health", () => {
  const journalServiceHealthInfo: HealthInfo = {
    status: "pass",
    version: "v0.14.0",
    commit: "c3e7159cb762396f064d43d55c30d90011c9357f",
    description: "journal service",
    build_time: "2024-07-25_14:25:52",
    instance_id: "6f203268-10a3-41f9-98dd-37941d130a3e",
  };

  const bootstrapServiceHealthInfo: HealthInfo = {
    status: "pass",
    version: "v0.14.0",
    commit: "c3e7159cb762396f064d43d55c30d90011c9357f",
    description: "bootstrap service",
    build_time: "2024-07-25_14:24:10",
    instance_id: "adb7257d-1e85-49c2-869b-c7332fd24b28",
  };

  const readerServiceHealthInfo: HealthInfo = {
    status: "pass",
    version: "v0.14.0",
    commit: "c3e7159cb762396f064d43d55c30d90011c9357f",
    description: "timescaledb-reader service",
    build_time: "2024-07-25_14:24:07",
    instance_id: "f158507c-a117-48a6-8110-7da540c8109a",
  };

  const httpAdapterServiceHealthInfo: HealthInfo = {
    status: "pass",
    version: "v0.14.0",
    commit: "c3e7159cb762396f064d43d55c30d90011c9357f",
    description: "http service",
    build_time: "2024-07-25_14:20:35",
    instance_id: "cb60c5a2-db54-469e-b8c7-33f97b843ba2",
  };

  const certsServiceHealthInfo: HealthInfo = {
    status: "pass",
    version: "v0.14.0",
    commit: "c3e7159cb762396f064d43d55c30d90011c9357f",
    description: "certs service",
    build_time: "2024-07-25_14:20:35",
    instance_id: "0b375343-1273-4efc-96a3-517ca74ec4c1",
  };

  const authServiceHealthInfo: HealthInfo = {
    status: "pass",
    version: "v0.14.0",
    commit: "c3e7159cb762396f064d43d55c30d90011c9357f",
    description: "auth service",
    build_time: "2024-07-25_14:20:35",
    instance_id: "0b375343-1273-4efc-96a3-517ca74ec4c1",
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetch certs service health information", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(certsServiceHealthInfo));

    const response = await sdk.Health.check("certs");
    expect(response).toEqual(certsServiceHealthInfo);
  });

  test("fetch journal service health information", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(journalServiceHealthInfo));

    const response = await sdk.Health.check("journal");
    expect(response).toEqual(journalServiceHealthInfo);
  });

  test("fetch bootstrap service health information", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(bootstrapServiceHealthInfo));

    const response = await sdk.Health.check("bootstrap");
    expect(response).toEqual(bootstrapServiceHealthInfo);
  });

  test("fetch reader service health information", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(readerServiceHealthInfo));

    const response = await sdk.Health.check("reader");
    expect(response).toEqual(readerServiceHealthInfo);
  });

  test("fetch http adapter service health information", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(httpAdapterServiceHealthInfo));

    const response = await sdk.Health.check("http-adapter");
    expect(response).toEqual(httpAdapterServiceHealthInfo);
  });

  test("fetch auth service health information", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(authServiceHealthInfo));

    const response = await sdk.Health.check("pats");
    expect(response).toEqual(authServiceHealthInfo);
  });
});
