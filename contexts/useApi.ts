import * as React from "react";
import { IApi } from "../api/createApi";

export const ApiContext = React.createContext<IApi | undefined>(undefined);
export const useApi = (): IApi => {
    const context = React.useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used within a ApiProvider");
    }
    return context;
};
