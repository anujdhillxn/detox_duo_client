// PermissionsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeModules } from 'react-native';
import { useAppContext } from '../../hooks/useAppContext';
import { useActions } from '../../hooks/useActions';

const { PermissionsModule } = NativeModules;

export const PermissionsScreen: React.FC = () => {
    const { permissions } = useAppContext();
    const { setPermissions } = useActions();

    useEffect(() => {
        checkPermissions();
    }, []);

    const checkPermissions = async () => {
        const hasUsageStatsPermission = await PermissionsModule.hasUsageStatsPermission();
        setPermissions((current) => { return { ...current, hasUsageStatsPermission } });
    };

    const handleRequestPermission = async () => {
        const permissionGranted = await PermissionsModule.requestUsageStatsPermission();
        if (permissionGranted) {
            Alert.alert("Permission Granted", "You can now track app usage.");
            // Navigate to the next screen or update state as needed
        } else {
            Alert.alert("Permission Required", "Please enable usage stats access for this app in settings.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {permissions.hasUsageStatsPermission === false
                    ? "Permissions are not granted. Please enable them to continue."
                    : "Checking for permissions..."}
            </Text>
            {permissions.hasUsageStatsPermission === false && (
                <Button title="Grant Permissions" onPress={handleRequestPermission} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});
