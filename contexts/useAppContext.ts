import * as React from "react";
import { Duo, Rule, RuleType, User } from "../types";

type AppContextType = {
    user: User | null;
    myDuo: Duo | null;
    duoRequests: Duo[];
    rules: Rule<RuleType>[];
};

export const AppContext = React.createContext<AppContextType | undefined>(
    undefined
);
export const useAppContext = (): AppContextType => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        );
    }
    return context;
};
