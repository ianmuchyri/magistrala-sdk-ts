// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import {
  ReportConfig,
  ReportConfigPage,
  ReportPage,
  ReportResponse,
  Response,
  RulesPageMetadata,
} from "./defs";
import Errors from "./errors";

/**
 * @class Reports
 * Handles interactions with the reports API, including creating, retrieving, updating,
 * enabling/disabling, deleting, and downloading reports and report configurations.
 */
export default class Reports {
  private readonly contentType: string;

  private readonly reportsEndpoint: string;

  private readonly configsEndpoint: string;

  private readonly reportsUrl: URL;

  /**
   * @constructor
   * Initializes the Reports API client.
   * @param {object} config - Configuration object.
   * @param {string} config.reportsUrl - Base URL for the reports API.
   */
  public constructor({ reportsUrl }: { reportsUrl: string }) {
    this.reportsUrl = new URL(reportsUrl);
    this.contentType = "application/json";
    this.reportsEndpoint = "reports";
    this.configsEndpoint = "configs";
  }

  /**
   * Generates a report using a provided report configuration.
   * @param {string} domainId - Domain identifier.
   * @param {ReportConfig} reportConfig - Configuration for generating the report.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportPage>} - The generated report data.
   * @throws {Error} - If the report generation fails.
   */
  public async generateReport(
    domainId: string,
    reportConfig: ReportConfig,
    token: string
  ): Promise<ReportPage> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reportConfig),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const report: ReportPage = await response.json();
      return report;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adds a new report configuration.
   * @param {string} domainId - Domain identifier.
   * @param {ReportConfig} reportConfig - Report configuration to add.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportConfig>} - The added report configuration.
   * @throws {Error} - If the configuration cannot be added.
   */
  public async addReportConfig(
    domainId: string,
    reportConfig: ReportConfig,
    token: string
  ): Promise<ReportConfig> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reportConfig),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${this.configsEndpoint}`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const newReportConfig: ReportConfig = await response.json();
      return newReportConfig;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a report configuration by ID.
   * @param {string} domainId - Domain identifier.
   * @param {string} configId - Report configuration ID.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportConfig>} - The requested report configuration.
   * @throws {Error} - If the configuration cannot be fetched.
   */
  public async viewReportConfig(
    domainId: string,
    configId: string,
    token: string
  ): Promise<ReportConfig> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${this.configsEndpoint}/${configId}`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const reportConfig: ReportConfig = await response.json();
      return reportConfig;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lists report configurations with optional query parameters.
   * @param {string} domainId - Domain identifier.
   * @param {RulesPageMetadata} queryParams - Query parameters for pagination and filtering.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportConfigPage>} - Paginated report configurations.
   * @throws {Error} - If configurations cannot be listed.
   */
  public async listReportConfigs(
    domainId: string,
    queryParams: RulesPageMetadata,
    token: string
  ): Promise<ReportConfigPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${
            this.configsEndpoint
          }?${new URLSearchParams(stringParams).toString()}`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const reportConfigs: ReportConfigPage = await response.json();
      return reportConfigs;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates an existing report configuration.
   * @param {string} domainId - Domain identifier.
   * @param {ReportConfig} config - Report configuration with updated values.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportConfig>} - The updated report configuration.
   * @throws {Error} - If the configuration cannot be updated.
   */

  public async updateReportConfig(
    domainId: string,
    config: ReportConfig,
    token: string
  ): Promise<ReportConfig> {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${this.configsEndpoint}/${config.id}`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const updatedReportConfig: ReportConfig = await response.json();
      return updatedReportConfig;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a report configuration.
   * @param {string} domainId - Domain identifier.
   * @param {string} configId - Report configuration ID.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<Response>} - Deletion status.
   * @throws {Error} - If the configuration cannot be deleted.
   */
  public async deleteReportConfig(
    domainId: string,
    configId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${this.configsEndpoint}/${configId}`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const statusResponse: Response = {
        status: response.status,
        message: "Report config deleted successfully",
      };
      return statusResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Enables a report configuration.
   * @param {string} domainId - Domain identifier.
   * @param {string} configId - Report configuration ID.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportConfig>} - The enabled report configuration.
   * @throws {Error} - If the configuration cannot be enabled.
   */
  public async enableReportConfig(
    domainId: string,
    configId: string,
    token: string
  ): Promise<ReportConfig> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${this.configsEndpoint}/${configId}/enable`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const enabledReportConfig: ReportConfig = await response.json();
      return enabledReportConfig;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Disables a report configuration.
   * @param {string} domainId - Domain identifier.
   * @param {string} configId - Report configuration ID.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportConfig>} - The disabled report configuration.
   * @throws {Error} - If the configuration cannot be disabled.
   */
  public async disableReportConfig(
    domainId: string,
    configId: string,
    token: string
  ): Promise<ReportConfig> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${this.configsEndpoint}/${configId}/disable`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disabledReportConfig: ReportConfig = await response.json();
      return disabledReportConfig;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Downloads a report by ID.
   * @param {string} domainId - Domain identifier.
   * @param {string} reportId - Unique report identifier.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<ReportResponse>} - The downloaded report data.
   * @throws {Error} - If the report cannot be downloaded.
   */
  public async downloadReport(
    domainId: string,
    reportId: string,
    token: string
  ): Promise<ReportResponse> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.reportsEndpoint}/${reportId}/download`,
          this.reportsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const report: ReportResponse = await response.json();
      return {
        ...report,
        pdf: report.pdf ? new Uint8Array(report.pdf) : undefined,
        csv: report.csv ? new Uint8Array(report.csv) : undefined,
      };
    } catch (error) {
      throw error;
    }
  }
}
