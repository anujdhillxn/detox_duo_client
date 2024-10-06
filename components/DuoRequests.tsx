import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';
import { TextInput, Button } from 'react-native';
import { useApi } from '../contexts/useApi';
import { DuoRequestHeaderRenderer } from './RuleMenuHeader';
import { useActions } from '../contexts/useActions';
import { HideableView } from './HideableView';

const DuoRequests: React.FC = () => {
    const { duoRequests, user } = useAppContext();
    const { setMyDuo, setDuoRequests } = useActions();
    const [username, setUsername] = useState('');
    const { duoApi } = useApi()
    const handleSendRequest = () => {
        console.log(`Sending duo request to ${username}`);
        duoApi.createDuo(username)
            .then(() => {
                console.log('Duo request sent successfully');
            })
            .catch((err) => {
                console.log('Error sending duo request:', err);
            })
    };

    const DuoRequestComponents = duoRequests.map((duo) => {
        const sender = duo.user1 === user!.username ? duo.user2 : duo.user1;
        return () => (
            <View style={styles.container}>
                <Text>{`Duo request from ${sender}`}</Text>
                <Button title="Accept" onPress={() => {
                    duoApi.confirmDuo(sender)
                        .then(() => {
                            duoApi.getDuos().then((duoResp) => {
                                setMyDuo(duoResp.myDuo.length ? duoResp.myDuo[0] : null);
                                setDuoRequests(duoResp.requestsSent.filter((duo) => !duo.isConfirmed));
                            }).catch((err) => {
                                console.log(err);
                            })
                        })
                        .catch((err) => {
                            console.log('Error confirming duo:', err);
                        });
                }} />
                <Button title="Reject" onPress={() => {
                    duoApi.deleteDuo(sender)
                        .then(() => {
                            console.log('Duo request rejected successfully');
                        })
                        .catch((err) => {
                            console.log('Error rejecting duo request:', err);
                        });
                }} />
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Send Duo Request" onPress={handleSendRequest} />
            <HideableView openedInitially Header={DuoRequestHeaderRenderer} Components={DuoRequestComponents} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
});

export default DuoRequests;