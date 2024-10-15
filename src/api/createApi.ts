import { createDuoApi } from "./duoApi";
import { createRuleApi } from "./ruleApi";
import { createUserApi } from "./userApi";
import { IApi, Remote } from "../types/api";

export const createApi = (remote: Remote): IApi => {
    const { requestToken, setRequestToken } = remote;
    const userApi = createUserApi(remote);
    const duoApi = createDuoApi(remote);
    const ruleApi = createRuleApi(remote);
    return { requestToken, setRequestToken, userApi, duoApi, ruleApi };
};
