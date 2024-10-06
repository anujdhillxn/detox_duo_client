import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';
import MyDuo from '../components/MyDuo';
import DuoRequests from '../components/DuoRequests';

const DuoScreen: React.FC = () => {
    const { myDuo } = useAppContext();
    return myDuo ? <MyDuo /> : <DuoRequests />;
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

export default DuoScreen;