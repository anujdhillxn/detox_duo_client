import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomTimePicker from "../../../../components/CustomTimePicker";
import { ScreenTimeDetails } from "../../../../types/state";

export type ScreentimeRuleCreatorProps = {
    onSave: (details: ScreenTimeDetails) => void;
    initialDetails?: ScreenTimeDetails;
};

export const formatTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    if (minutes > 0) {
        if (formattedTime) {
            formattedTime += ', ';
        }
        formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return formattedTime || '0 minutes';
};

export const ScreenTimeRuleCreator = (props: ScreentimeRuleCreatorProps): React.ReactNode => {
    console.log(props.initialDetails);
    const [dailyMaxMinutes, setDailyMaxMinutes] = useState(props.initialDetails ? props.initialDetails.dailyMaxSeconds : 30);
    const [hourlyMaxMinutes, setHourlyMaxMinutes] = useState(props.initialDetails ? props.initialDetails.hourlyMaxSeconds : 5);
    const [dailyStartsAt, setStartsAt] = useState<Date>(props.initialDetails ? new Date(props.initialDetails.dailyStartsAt) : new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleSave = () => {
        props.onSave({ dailyMaxSeconds: dailyMaxMinutes * 60, hourlyMaxSeconds: hourlyMaxMinutes * 60, dailyStartsAt: dailyStartsAt.toISOString() });
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setStartsAt(date);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Screen Time Details</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.touchable}>
                <Text style={styles.text}>Daily Limit Reset</Text>
                <Text style={styles.textSmall}>{dailyStartsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            <CustomTimePicker onConfirm={(hh, mm) => setDailyMaxMinutes(Number(hh) * 60 + Number(mm))}>
                <View style={styles.touchable}>
                    <Text style={styles.text}>Daily Max Screen Time</Text>
                    <Text style={styles.textSmall}>{formatTime(dailyMaxMinutes)}</Text>
                </View>
            </CustomTimePicker>
            <CustomTimePicker hideHours onConfirm={(hh, mm) => setHourlyMaxMinutes(Number(hh) * 60 + Number(mm))}>
                <View style={styles.touchable}>
                    <Text style={styles.text}>Hourly Max Screen Time</Text>
                    <Text style={styles.textSmall}>{formatTime(hourlyMaxMinutes)}</Text>
                </View>
            </CustomTimePicker>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    touchable: {
        marginBottom: 20,
        borderWidth: 1, // Add border width
        borderColor: '#ccc', // Add light border color
        padding: 10, // Add padding for better touch area
        borderRadius: 5, // Optional: Add border radius for rounded corners
    },
    text: {
        fontSize: 18,
    },
    textSmall: {
        fontSize: 16,
        color: '#777',
    }
});