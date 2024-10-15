import React from "react";
import { ApiContext } from "../hooks/useApi";
import { createApi } from "./createApi";
import useRemote from "../hooks/useRemote";
import { IApi } from "../types/api";

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const remote = useRemote();
    const api = React.useMemo<IApi>(() => createApi(remote), [remote]);

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}