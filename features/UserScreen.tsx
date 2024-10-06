import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';
import { useApi } from '../contexts/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useActions } from '../contexts/useActions';

const UserScreen: React.FC = () => {
    const { user } = useAppContext();
    const { remote, userApi } = useApi();
    const { setUser } = useActions();
    const handleLogout = async () => {
        try {
            setUser(null);
            remote.setRequestToken(null);
            AsyncStorage.removeItem('userToken');
            await userApi.logout();
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Hi ${user?.username}`}</Text>
            <Button title="Logout" onPress={handleLogout} />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default UserScreen;