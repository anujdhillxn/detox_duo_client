import { Duo } from "../types";
import { Remote } from "./useRemote";

export type GetDuoResponse = {
    myDuo: Duo[];
    requestsSent: Duo[];
    requestsReceived: Duo[];
};

export const useDuoApi = (remote: Remote) => {
    const { get, post, put, del } = remote;

    const getDuos = (): Promise<GetDuoResponse> => {
        return get("duos/duo-list");
    };

    const createDuo = (username: string) => {
        return post("duos/create-duo", { user2_username: username });
    };

    const confirmDuo = (username: string) => {
        return put("duos/confirm-duo", { user1_username: username });
    };

    const deleteDuo = (username: string) => {
        return del("duos/delete-duo", { other_user_name: username });
    };

    return { getDuos, createDuo, confirmDuo, deleteDuo };
};
