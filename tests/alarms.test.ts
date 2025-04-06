// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import Alarms from "../src/alarms";
import {
  AlarmStatus,
  type Alarm,
  type AlarmsPage,
  type Response,
} from "../src/defs";

enableFetchMocks();

const alarmsUrl = "http://localhost";
const sdk = new Alarms({ alarmsUrl });

const alarm: Alarm = {
  id: "12345",
  rule_id: "rule123",
  message: "High temperature alert",
  status: AlarmStatus.Assigned,
};

const alarms: Alarm[] = [
  {
    id: "12345",
    rule_id: "rule123",
    message: "High temperature alert",
    status: AlarmStatus.Assigned,
  },
  {
    id: "12346",
    rule_id: "rule124",
    message: "Low temperature alert",
    status: AlarmStatus.Ignored,
  },
];

const queryParams = {
  offset: 0,
  limit: 10,
};

const alarmsPage: AlarmsPage = {
  alarms,
  total: 2,
  offset: 0,
  limit: 10,
};

const alarmId = "12345";
const domainId = "domain123";
const token = "valid token";
const successResponse: Response = {
  status: 200,
  message: "Alarm deleted successfully",
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Alarms", () => {
  test("Create should create an alarm", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(alarm));

    const response = await sdk.create(alarm, domainId, token);
    expect(response).toEqual(alarm);
  });

  test("List should get a list of alarms", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(alarmsPage));

    const response = await sdk.list(queryParams, domainId, token);
    expect(response).toEqual(alarmsPage);
  });

  test("View should retrieve an alarm", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(alarm));

    const response = await sdk.view(alarmId, domainId, token);
    expect(response).toEqual(alarm);
  });

  test("Update should update an alarm", async () => {
    const updatedAlarm = {
      ...alarm,
      message: "Updated high temperature alert",
    };
    fetchMock.mockResponseOnce(JSON.stringify(updatedAlarm));

    const response = await sdk.update(updatedAlarm, domainId, token);
    expect(response).toEqual(updatedAlarm);
  });

  test("Delete should delete an alarm", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.delete(alarmId, domainId, token);
    expect(response).toEqual(successResponse);
  });
});
