// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import { Rule, RulesPage, RulesPageMetadata, Response, Schedule } from "./defs";
import Errors from "./errors";

/**
 * @class Rules
 * Handles interactions with rules API, including creating, updating and managing rules.
 */
export default class Rules {
  private readonly contentType: string;

  private readonly rulesEndpoint: string;

  private readonly rulesUrl: URL;

  /**
   * @constructor
   * Initializes the Rules API client.
   * @param {object} config - Configuration object.
   * @param {string} config.rulesUrl - Base URL for the rules API.
   */
  public constructor({ rulesUrl }: { rulesUrl: string }) {
    this.rulesUrl = new URL(rulesUrl);
    this.contentType = "application/json";
    this.rulesEndpoint = "rules";
  }

  /**
   * @method create - Creates a new rule
   * @param {string} domainId - The unique ID of the domain.
   * @param {Rule} rule - Rule object with a containing details like name, input_channel, input_topic and logic.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The created rule object.
   * @throws {Error} - If the rule cannot be created.
   */
  public async create(
    domainId: string,
    rule: Rule,
    token: string
  ): Promise<Rule> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rule),
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/${this.rulesEndpoint}`, this.rulesUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const newRule: Rule = await response.json();
      return newRule;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method view - Retrieves a rule by its id.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} ruleId - The unique ID of the rule.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The requested rule object.
   * @throws {Error} - If the rule cannot be fetched.
   */
  public async view(
    domainId: string,
    ruleId: string,
    token: string
  ): Promise<Rule> {
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
          `${domainId}/${this.rulesEndpoint}/${ruleId}`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const rule: Rule = await response.json();
      return rule;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method list - Retrieves all rules matching the provided query parameters.
   * @param {string} domainId - The unique ID of the domain.
   * @param {RulesPageMetadata} queryParams - Query parameters for the request.
   * @param {string} token - Authorization token.
   * @returns {Promise<RulesPage>} rulesPage - A page of rules.
   * @throws {Error} - If the rules cannot be fetched.
   */
  public async list(
    domainId: string,
    queryParams: RulesPageMetadata,
    token: string
  ): Promise<RulesPage> {
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
          `${domainId}/${this.rulesEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const rulesPage: RulesPage = await response.json();
      return rulesPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method update - Updates an existing rule.
   * @param {string} domainId - The unique ID of the domain.
   * @param {Rule} rule - rule object with updated properties.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The updated rule object.
   * @throws {Error} - If the rule cannot be updated.
   */
  public async update(
    domainId: string,
    rule: Rule,
    token: string
  ): Promise<Rule> {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rule),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.rulesEndpoint}/${rule.id}`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const updatedRule: Rule = await response.json();
      return updatedRule;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method updateSchedule - Updates the schedule for a specific rule.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} ruleId - The ID of the rule whose schedule is to be updated.
   * @param {Schedule} schedule - The updated schedule object.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The updated rule object.
   * @throws {Error} - If the schedule cannot be updated.
   */
  public async updateSchedule(
    domainId: string,
    ruleId: string,
    schedule: Schedule,
    token: string
  ): Promise<Rule> {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ schedule }),
    };

    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.rulesEndpoint}/${ruleId}/schedule`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const updatedSchedule: Rule = await response.json();
      return updatedSchedule;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method delete - Deletes a rule.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} ruleId - The  unique ID of the rule.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the rule is successfully deleted.
   * @throws {Error} - If the rule cannot be deleted.
   */
  public async delete(
    domainId: string,
    ruleId: string,
    token: string
  ): Promise<Response> {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.rulesEndpoint}/${ruleId}`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const statusResponse: Response = {
        status: response.status,
        message: "Rule deleted successfully",
      };
      return statusResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method enable - Enables a previously disabled rule.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} ruleId - The  unique ID of the rule.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The enabled rule object.
   * @throws {Error} - If the rule cannot be enabled.
   */
  public async enable(
    domainId: string,
    ruleId: string,
    token: string
  ): Promise<Rule> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.rulesEndpoint}/${ruleId}/enable`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const enabledRule: Rule = await response.json();
      return enabledRule;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method disable - Disables a specific rule.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} ruleId - The  unique ID of the rule.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The disabled rule object.
   * @throws {Error} - If the rule cannot be disabled.
   */
  public async disable(
    domainId: string,
    ruleId: string,
    token: string
  ): Promise<Rule> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.rulesEndpoint}/${ruleId}/disable`,
          this.rulesUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disabledRule: Rule = await response.json();
      return disabledRule;
    } catch (error) {
      throw error;
    }
  }
}
