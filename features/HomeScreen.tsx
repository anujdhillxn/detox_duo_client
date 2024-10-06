import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AllRulesView } from '../components/AllRulesView';
import { useAppContext } from '../contexts/useAppContext';
import { NoDuoFoundView } from '../components/NoDuoFoundView';

const HomeScreen: React.FC = () => {
    const { myDuo } = useAppContext();

    return (
        <View style={styles.container}>
            {myDuo ? (
                <AllRulesView />
            ) : (
                <NoDuoFoundView />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignSelf: 'center'
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    createButtonIcon: {
        marginRight: 10, // Add margin to the left of the icon
    },
});

export default HomeScreen;