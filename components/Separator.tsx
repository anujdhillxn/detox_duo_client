import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator: React.FC = () => {
    return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
    separator: {
        width: '90%',
        height: 1,
        backgroundColor: '#E0E0E0',
        alignSelf: 'center',
    },
});

export default Separator;