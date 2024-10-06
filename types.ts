import { ScreentimeRuleCard } from "./features/RuleCards/ScreentimeRuleCard";
import { ScreenTimeRuleCreator } from "./features/RuleCreators/ScreentimeRuleCreator";

export type User = {
    username: string;
    email: string;
};

export type Duo = {
    user1: string;
    user2: string;
    isConfirmed: boolean;
    confirmedAt: Date | null;
};

export enum RuleType {
    SCREENTIME = "SCREENTIME",
}

export type ScreenTimeDetails = {
    maxMinutes: number;
    startsAt: Date;
};

export type RuleDetailsMap = {
    [RuleType.SCREENTIME]: ScreenTimeDetails;
    // Add more mappings as needed
};

export const RuleCreatorComponents = {
    [RuleType.SCREENTIME]: ScreenTimeRuleCreator,
};

export const RuleCardComponents = {
    [RuleType.SCREENTIME]: ScreentimeRuleCard,
};

export type Rule<T extends RuleType> = {
    app: string;
    ruleType: T;
    changeAllowed: boolean;
    isActive: boolean;
    isMyRule: boolean;
    details: RuleDetailsMap[T];
};
