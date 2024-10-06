import useRemote, { Remote } from "./useRemote";

interface IRegisterArgs {
    username: string;
    password: string;
    email: string;
}

interface IRegisterResponse {
    token: string;
}

interface ILoginArgs {
    identifier: string;
    password: string;
}

interface ILoginResponse {
    token: string;
}

interface IUserResponse {
    username: string;
    email: string;
}

export const useUserApi = (remote: Remote) => {
    const { get, post } = remote;

    const register = (userData: IRegisterArgs) => {
        return post("users/register", userData);
    };

    const login = (credentials: ILoginArgs) => {
        return post("users/login", credentials);
    };

    const getUser = () => {
        return get("users/me/");
    };

    const logout = () => {
        return post("users/logout");
    };
    return { register, login, getUser, logout };
};
