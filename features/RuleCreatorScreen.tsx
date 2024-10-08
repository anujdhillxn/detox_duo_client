import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RuleCreatorComponents, RuleDetailsMap, RuleType } from '../types';
import { useApi } from '../contexts/useApi';
import { useActions } from '../contexts/useActions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
const dummyApps = [
    { label: 'App 1', value: 'App 1' },
    { label: 'App 2', value: 'App 2' },
    { label: 'App 3', value: 'App 3' },
    { label: 'App 4', value: 'App 4' },
    { label: 'App 5', value: 'App 5' },
];

const ruleTypes = Object.keys(RuleType).map((key) => ({
    label: key,
    value: RuleType[key as keyof typeof RuleType],
}));

const RuleCreatorScreen: React.FC = () => {
    const [selectedApp, setSelectedApp] = useState<string | null>(null);
    const [selectedRuleType, setSelectedRuleType] = useState<RuleType | null>(null);
    const RuleDetailsComponent = selectedApp && selectedRuleType ? RuleCreatorComponents[selectedRuleType] : null;
    const { ruleApi } = useApi();
    const { setRules } = useActions();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [installedApps, setInstalledApps] = useState<{ label: string, value: string }[]>([]);
    const onSave = (ruleDetails: RuleDetailsMap[RuleType]) => {
        ruleApi.createRule({ app: selectedApp!, ruleType: selectedRuleType!, details: ruleDetails })
            .then(() => {
                ruleApi.getRules().then((rulesResp) => {
                    setRules(rulesResp);
                    navigation.navigate('Home');
                })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log('Error creating rule:', err);
            })
    }

    return (
        <View style={styles.container}>
            <Text>Select App:</Text>
            <Picker
                selectedValue={selectedApp}
                onValueChange={(itemValue) => setSelectedApp(itemValue)}
            >
                <Picker.Item label="Select App" value={null} style={styles.placeholder} />
                {dummyApps.map((app) => (
                    <Picker.Item key={app.value} label={app.label} value={app.value} />
                ))}
            </Picker>

            <Text>Select Rule Type:</Text>
            <Picker
                selectedValue={selectedRuleType}
                onValueChange={(itemValue) => setSelectedRuleType(itemValue)}
            >
                <Picker.Item style={styles.placeholder} label="Select Rule Type" value={null} />
                {ruleTypes.map((ruleType) => (
                    <Picker.Item key={ruleType.value} label={ruleType.label} value={ruleType.value} />
                ))}
            </Picker>

            {RuleDetailsComponent && <RuleDetailsComponent onSave={onSave} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    ruleDetailsContainer: {
        marginTop: 20,
    },
    selectedAppText: {
        fontSize: 18,
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 20,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    placeholder: {
        color: '#888', // Grey color for the placeholder text
    },
});

export default RuleCreatorScreen;