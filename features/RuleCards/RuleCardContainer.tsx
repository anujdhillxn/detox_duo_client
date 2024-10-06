import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Rule, RuleCardComponents, RuleType } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { useApi } from '../../contexts/useApi';
import { useActions } from '../../contexts/useActions';
const RuleCardContainer: React.FC<{ rule: Rule<RuleType> }> = ({ rule }) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { ruleApi } = useApi();
    const { setRules } = useActions();
    const navigateToRuleEditor = () => {
        navigation.navigate('RuleEditor', rule);
    };

    const toggleEdit = () => {
        ruleApi.allowChange(rule)
            .then(() => {
                ruleApi.getRules().then((rulesResp) => {
                    setRules(rulesResp);
                })
                    .catch((err) => {
                        console.log(err);
                    })
            })
    };

    const deleteRule = () => {
        // Logic to delete the rule
    };

    const RuleCardDetails = RuleCardComponents[rule.ruleType];
    return (
        <View style={styles.container}>
            <View style={styles.detailsSection}>
                <RuleCardDetails rule={rule} />
            </View>
            <View style={styles.buttonsSection}>
                <Menu>
                    <MenuTrigger>
                        <Icon name="more-vert" size={24} color="#000" />
                    </MenuTrigger>
                    <MenuOptions>
                        {!rule.isMyRule && <MenuOption onSelect={navigateToRuleEditor} text="Edit" />}
                        {rule.isMyRule && <MenuOption onSelect={toggleEdit} text={`${rule.changeAllowed ? "Disable" : "Enable"} Edits by Partner`} />}
                        {!rule.isMyRule && <MenuOption onSelect={deleteRule} text="Delete" />}
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    detailsSection: {
        flex: 1,
    },
    buttonsSection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        marginVertical: 4,
    },
});
export default RuleCardContainer;