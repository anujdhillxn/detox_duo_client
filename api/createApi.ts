import { useDuoApi } from "./useDuoApi";
import useRemote, { Remote } from "./useRemote";
import { useRuleApi } from "./useRuleApi";
import { useUserApi } from "./useUserApi";

export interface IApi {
    remote: Remote;
    userApi: ReturnType<typeof useUserApi>;
    duoApi: ReturnType<typeof useDuoApi>;
    ruleApi: ReturnType<typeof useRuleApi>;
}

export const createApi = (): IApi => {
    const remote = useRemote();
    const userApi = useUserApi(remote);
    const duoApi = useDuoApi(remote);
    const ruleApi = useRuleApi(remote);
    return { remote, userApi, duoApi, ruleApi };
};
