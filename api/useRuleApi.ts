import { Rule, RuleType } from "../types";
import { Remote } from "./useRemote";

export const useRuleApi = (remote: Remote) => {
    const { get, post, put } = remote;

    const getRules = (): Promise<Rule<RuleType>[]> => {
        return get("rules/user-rules");
    };

    const createRule = (rule: Partial<Rule<RuleType>>) => {
        return post("rules/create-rule", {
            app: rule.app,
            ruletype: rule.ruleType,
            rule_details: JSON.stringify(rule.details),
        });
    };

    const allowChange = (rule: Partial<Rule<RuleType>>) => {
        return put(`rules/allow-change-to-rule`, {
            app: rule.app,
            ruletype: rule.ruleType,
        });
    };

    return { getRules, createRule, allowChange };
};
