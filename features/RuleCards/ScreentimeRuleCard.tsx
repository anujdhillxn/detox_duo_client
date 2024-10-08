import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Rule, RuleType } from '../../types';
import { formatTime } from '../RuleCreators/ScreentimeRuleCreator';

interface ScreentimeRuleCardProps {
    rule: Rule<RuleType.SCREENTIME>;
}

export const ScreentimeRuleCard: React.FC<ScreentimeRuleCardProps> = ({ rule }) => {
    return (
        <View style={styles.card}>
            <Text style={[styles.title, { color: rule.isActive ? '#000' : '#888' }]}>{rule.app}</Text>
            <Text style={styles.timeLimit}>Daily: {formatTime(rule.details.dailyMaxSeconds / 60)}, Hourly: {formatTime(rule.details.hourlyMaxSeconds / 60)}</Text>
            <Text style={styles.timeLimit}>Resets at: {new Date(rule.details.dailyStartsAt).toLocaleTimeString()}</Text>
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