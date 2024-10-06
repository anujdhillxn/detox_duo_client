import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';

const MyDuo: React.FC = () => {
    const myDuo = useAppContext().myDuo!;
    const user = useAppContext().user!;
    const partner = user.username === myDuo.user1 ? myDuo.user2 : myDuo.user1;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`You and ${partner} have been detox duos since ${myDuo.confirmedAt}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
});

export default MyDuo;