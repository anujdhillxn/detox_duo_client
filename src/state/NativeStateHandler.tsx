import { NativeModules, View } from "react-native";
import { useAppContext } from "../hooks/useAppContext";
import React from "react";
const { UsageTracker } = NativeModules;
type NativeStateHandlerProps = {
    children: React.ReactNode;
};

export const NativeStateHandler = (props: NativeStateHandlerProps) => {

    const { rules } = useAppContext();

    const setScreentimeRules = async () => {
        const screentimeRules = rules.filter(rule => rule.ruleType === "SCREENTIME");
        const res = await UsageTracker.setRules(screentimeRules);
        console.log(res);
    }

    React.useEffect(() => {
        setScreentimeRules();
    }, [rules]);

    return <>{props.children}</>
}