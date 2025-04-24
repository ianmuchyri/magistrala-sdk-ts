// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import SDK, {
  Metric,
  Report,
  ReportConfig,
  ReportConfigPage,
  ReportPage,
  SenMLMessage,
} from "../src/sdk";
import { ReportResponse, Schedule } from "../src/defs";

enableFetchMocks();

const rulesUrl = "http://localhost";
const sdk = new SDK({ rulesUrl });

describe("Reports SDK", () => {
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
  const domainId = "a5a4b1a1-ea89-47ed-af2e-5b38e696d6a1";
  const queryParams = {
    offset: 0,
    limit: 10,
  };

  const metric: Metric = {
    channel_id: "channel",
    client_id: "client",
    name: "temp",
    subtopic: "",
    protocol: "",
    format: "",
  };

  const schedule: Schedule = {
    start_datetime: "2025-04-24T12:00:00.000Z",
    time: "1970-01-01T10:00:00.000Z",
    recurring: "weekly",
    recurring_period: 1,
  };

  const reportConfig: ReportConfig = {
    id: "id",
    name: "name",
    description: "description",
    domain_id: domainId,
    metrics: [metric],
    schedule,
  };

  const reportConfigPage: ReportConfigPage = {
    report_configs: [reportConfig],
    total: 1,
    offset: 0,
    limit: 10,
  };

  const message: SenMLMessage = {
    channel: "aecf0902-816d-4e38-a5b3-a1ad9a7cf9e8",
    publisher: "2766ae94-9a08-4418-82ce-3b91cf2ccd3e",
    protocol: "http",
    name: "voltage",
    unit: "V",
    time: 1276020076.001,
    value: 120.1,
  };

  const report: Report = {
    metric,
    messages: [message],
  };

  const reportsPage: ReportPage = {
    reports: [report],
    total: 1,
  };

  const reportResponse: ReportResponse = {
    pdf: new Uint8Array([37, 80, 68, 70, 45, 49, 46, 55]),
    csv: new Uint8Array([
      105, 100, 44, 110, 97, 109, 101, 10, 49, 44, 74, 111, 104, 110, 10,
    ]),
    filename: "monthly-report-april-2025",
    content_type: "application/zip",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Generate report should generate a reports page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(reportsPage));

    const response = await sdk.Reports.generateReport(
      domainId,
      reportConfig,
      token
    );
    expect(response).toEqual(reportsPage);
  });

  test("Add report config should add a new report configuration", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(reportConfig));

    const response = await sdk.Reports.addReportConfig(
      domainId,
      reportConfig,
      token
    );
    expect(response).toEqual(reportConfig);
  });

  test("View report config should return a report configuration", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(reportConfig));

    const response = await sdk.Reports.viewReportConfig(
      domainId,
      reportConfig.id as string,
      token
    );

    expect(response).toEqual(reportConfig);
  });

  test("List report configs should return a list of report configurations", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(reportConfigPage));
    const response = await sdk.Reports.listReportConfigs(
      domainId,
      queryParams,
      token
    );
    expect(response).toEqual(reportConfigPage);
  });

  test("Update report config should update an existing report configuration", async () => {
    const updatedConfig: ReportConfig = {
      ...reportConfig,
      name: "updated name",
    };

    fetchMock.mockResponseOnce(JSON.stringify(updatedConfig));

    const response = await sdk.Reports.updateReportConfig(
      domainId,
      updatedConfig,
      token
    );

    expect(response).toEqual(updatedConfig);
  });

  test("Update report schedule should update an existing report schedule", async () => {
    const updatedSchedule: Schedule = {
      ...schedule,
      recurring_period: 2,
    };
    reportConfig.schedule = updatedSchedule;

    fetchMock.mockResponseOnce(JSON.stringify(reportConfig));

    const response = await sdk.Reports.updateReportSchedule(
      domainId,
      reportConfig.id as string,
      updatedSchedule,
      token
    );

    expect(response).toEqual(reportConfig);
  });

  test("Delete report config should delete an existing report configuration", async () => {
    const successResponse = {
      status: 200,
      message: "Report config deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.Reports.deleteReportConfig(
      domainId,
      reportConfig.id as string,
      token
    );

    expect(response).toEqual(successResponse);
  });

  test("Enable report config should enable a report configuration", async () => {
    reportConfig.status = "enabled";
    fetchMock.mockResponseOnce(JSON.stringify(reportConfig));

    const response = await sdk.Reports.enableReportConfig(
      domainId,
      reportConfig.id as string,
      token
    );
    expect(response).toEqual(reportConfig);
  });

  test("Disable report config should disable a report configuration", async () => {
    reportConfig.status = "disabled";
    fetchMock.mockResponseOnce(JSON.stringify(reportConfig));

    const response = await sdk.Reports.disableReportConfig(
      domainId,
      reportConfig.id as string,
      token
    );
    expect(response).toEqual(reportConfig);
  });

  test("Download report should download a report based on the report config id", async () => {
    const rawResponse = {
      ...reportResponse,
      pdf: Array.from(reportResponse.pdf!),
      csv: Array.from(reportResponse.csv!),
    };

    fetchMock.mockResponseOnce(JSON.stringify(rawResponse));

    const response = await sdk.Reports.downloadReport(
      domainId,
      reportConfig.id as string,
      token
    );
    expect(response).toEqual(reportResponse);
  });
});
