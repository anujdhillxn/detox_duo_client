import * as React from "react";
import { Duo, Rule, RuleType, User } from "../types";

type AppActionsType = {
    setUser: (user: User | null) => void;
    setMyDuo: (duo: Duo | null) => void;
    setDuoRequests: (duos: Duo[]) => void;
    setRules: (rules: Rule<RuleType>[]) => void;
};

export const AppActions = React.createContext<AppActionsType | undefined>(
    undefined
);
export const useActions = (): AppActionsType => {
    const context = React.useContext(AppActions);
    if (!context) {
        throw new Error("useAppContext must be used within a UserProvider");
    }
    return context;
};
