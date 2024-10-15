import React from 'react';
import { View, Text, StyleSheet, Button, NativeModules } from 'react-native';
import { formatTime } from '../RuleCreators/ScreentimeRuleCreator';
import { Rule, RuleType } from '../../../../types/state';
const { UsageTracker } = NativeModules;

interface ScreentimeRuleCardProps {
    rule: Rule<RuleType.SCREENTIME>;
}

export const ScreentimeRuleCard: React.FC<ScreentimeRuleCardProps> = ({ rule }) => {

    const [usage, setUsage] = React.useState(0);
    const fetchUsage = async () => {
        const usage = await UsageTracker.getScreenTime(rule.app);
        setUsage(usage);
    };
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsage();
        }, 5000)
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <View style={styles.card}>
            <Text style={[styles.title, { color: rule.isActive ? '#000' : '#888' }]}>{rule.app}</Text>
            <Text style={styles.timeLimit}>Daily: {formatTime(rule.details.dailyMaxSeconds / 60)}, Hourly: {formatTime(rule.details.hourlyMaxSeconds / 60)}</Text>
            <Text style={styles.timeLimit}>Resets at: {new Date(rule.details.dailyStartsAt).toLocaleTimeString()}</Text>
            <Text style={styles.timeLimit}>Current: {usage} Seconds</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    timeLimit: {
        fontSize: 12,
        color: '#888',
    },
});