import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Rule, RuleType } from '../types'; // Assuming you have these types defined

type RuleEditorRouteProp = RouteProp<RootStackParamList, 'RuleEditor'>;

export const RuleEditorScreen: React.FC = () => {
    const route = useRoute<RuleEditorRouteProp>();
    const rule = route.params;

    return (
        <View>
            <Text>Rule Editor</Text>
            <Text>{rule.app}</Text>
            <Text>{rule.ruleType}</Text>
            <Text>{rule.changeAllowed ? 'Change Allowed' : 'Change Not Allowed'}</Text>
            <Text>{rule.isActive ? 'Active' : 'Inactive'}</Text>
            <Text>{rule.isMyRule ? 'My Rule' : 'Partner Rule'}</Text>
            {/* Render other rule details as needed */}
        </View>
    );
};