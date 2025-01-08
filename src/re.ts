import { Rule, RulesPage, RulesPageMetadata, Response } from "./defs";
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
   * @method CreateRule - Creates a new rule
   * @param {Rule} rule - Rule object with a containing details like name, input_channel, input_topic and logic.
   * @param {string} domainId - The  unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The created rule object.
   * @throws {Error} - If the rule cannot be created.
   */
  public async CreateRule(
    rule: Rule,
    domainId: string,
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
   * @method ViewRule - Retrieves a rule by its id.
   * @param {string} ruleId - The unique ID of the rule.
   * @param {string} domainId - The  unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The requested rule object.
   * @throws {Error} - If the rule cannot be fetched.
   */
  public async ViewRule(
    ruleId: string,
    domainId: string,
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
   * @method ListRules - Retrieves all rules matching the provided query parameters.
   * @param {RulesPageMetadata} queryParams - Query parameters for the request.
   * @param {string} domainId - The  unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<RulesPage>} rulesPage - A page of rules.
   * @throws {Error} - If the rules cannot be fetched.
   */
  public async ListRules(
    queryParams: RulesPageMetadata,
    domainId: string,
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
   * @method UpdateRule - Updates an existing rule.
   * @param {Rule} rule - rule object with updated properties.
   * @param {string} domainId - The  unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Rule>} rule - The updated rule object.
   * @throws {Error} - If the rule cannot be updated.
   */
  public async UpdateRule(
    rule: Rule,
    domainId: string,
    token: string
  ): Promise<Rule> {
    const options: RequestInit = {
      method: "PUT",
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
   * @method DeleteRule - Deletes a rule.
   * @param {string} ruleId - The  unique ID of the rule.
   * @param {string} domainId - The  unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the rule is successfully deleted.
   * @throws {Error} - If the rule status cannot be updated.
   */
  public async DeleteRule(
    ruleId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.rulesEndpoint}/${ruleId}/delete`,
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
        message: "Rule status updated successfully",
      };
      return statusResponse;
    } catch (error) {
      throw error;
    }
  }
}
