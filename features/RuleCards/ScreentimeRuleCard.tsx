import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Rule, RuleType } from '../../types';

interface ScreentimeRuleCardProps {
    rule: Rule<RuleType.SCREENTIME>;
}

export const ScreentimeRuleCard: React.FC<ScreentimeRuleCardProps> = ({ rule }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{rule.app}</Text>
            <Text style={styles.timeLimit}>Time Limit: {rule.details.maxMinutes} minutes</Text>
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