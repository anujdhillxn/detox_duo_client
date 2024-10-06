import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback, useEffect } from "react";

interface RequestOptions {
    method: string;
    headers?: HeadersInit;
    body?: any;
}

export type Remote = {
    get: (endpoint: string, headers?: HeadersInit) => Promise<any>;
    post: (endpoint: string, body?: any, headers?: HeadersInit) => Promise<any>;
    put: (endpoint: string, body: any, headers?: HeadersInit) => Promise<any>;
    del: (endpoint: string, headers?: HeadersInit) => Promise<any>;
    requestToken: string | null;
    setRequestToken: (token: string | null) => void;
};

const useRemote = (): Remote => {
    const [requestToken, setRequestToken] = useState<string | null>(null);
    const baseUrl = "http://localhost:8000/api/";
    useEffect(() => {
        AsyncStorage.getItem("userToken").then((token) => {
            token && setRequestToken(token);
        });
    }, []);
    const request = useCallback(
        async (endpoint: string, options: RequestOptions) => {
            const headers = new Headers(options.headers);
            if (requestToken) {
                headers.set("Authorization", `Token ${requestToken}`);
            }
            headers.set("Content-Type", "application/json");
            try {
                const response = await fetch(`${baseUrl}${endpoint}`, {
                    ...options,
                    headers,
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (err) {
                console.log("Error fetching data:", err);
            }
        },
        [baseUrl, requestToken]
    );

    const get = useCallback(
        (endpoint: string, headers?: HeadersInit) => {
            return request(endpoint, { method: "GET", headers });
        },
        [request]
    );

    const post = useCallback(
        (endpoint: string, body: any, headers?: HeadersInit) => {
            return request(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...headers },
                body: JSON.stringify(body),
            });
        },
        [request]
    );

    const put = useCallback(
        (endpoint: string, body: any, headers?: HeadersInit) => {
            return request(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json", ...headers },
                body: JSON.stringify(body),
            });
        },
        [request]
    );

    const del = useCallback(
        (endpoint: string, headers?: HeadersInit) => {
            return request(endpoint, { method: "DELETE", headers });
        },
        [request]
    );

    return { get, post, put, del, requestToken, setRequestToken };
};

export default useRemote;
