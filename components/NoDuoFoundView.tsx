import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const NoDuoFoundView: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navigateToDuoScreen = () => {
        navigation.navigate('Duo');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.noDuoText}>No Duo Found</Text>
            <TouchableOpacity style={styles.createButton} onPress={navigateToDuoScreen}>
                <Icon name="add" size={20} color="#fff" style={styles.createButtonIcon} />
                <Text style={styles.createButtonText}>Create Duo</Text>
            </TouchableOpacity>
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
    noDuoText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});