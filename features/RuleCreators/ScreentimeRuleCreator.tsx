import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScreenTimeDetails } from "../../types";

export const ScreenTimeRuleCreator: React.FC<{ onSave: (details: ScreenTimeDetails) => void }> = ({ onSave }) => {
    const [maxMinutes, setMaxMinutes] = useState(0);
    const [startsAt, setStartsAt] = useState<Date>(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isMaxMinutesPickerVisible, setMaxMinutesPickerVisibility] = useState(false);

    const handleSave = () => {
        onSave({ maxMinutes, startsAt });
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

    const showMaxMinutesPicker = () => {
        setMaxMinutesPickerVisibility(true);
    };

    const hideMaxMinutesPicker = () => {
        setMaxMinutesPickerVisibility(false);
    };

    const handleMaxMinutesConfirm = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        setMaxMinutes(hours * 60 + minutes);
        hideMaxMinutesPicker();
    };

    return (
        <View>
            <Text>Screen Time Details</Text>
            <TouchableOpacity onPress={showDatePicker}>
                <Text>Select Start Time: {startsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <TouchableOpacity onPress={showMaxMinutesPicker}>
                <Text>Set The Screentime Cap: {`${Math.floor(maxMinutes / 60).toString().padStart(2, '0')}:${(maxMinutes % 60).toString().padStart(2, '0')}`}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isMaxMinutesPickerVisible}
                mode="time"
                onConfirm={handleMaxMinutesConfirm}
                onCancel={hideMaxMinutesPicker}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};