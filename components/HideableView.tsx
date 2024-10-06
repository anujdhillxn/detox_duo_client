import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export type HeaderProps = {
    menuVisible: boolean;
    toggleMenu: () => void;
    itemCount: number;
};

interface MenuProps {
    Header: (props: HeaderProps) => React.ReactNode;
    Components: (() => React.ReactNode)[];
    openedInitially?: boolean
}

export const HideableView: React.FC<MenuProps> = ({ Header, Components, openedInitially }) => {
    const [menuVisible, setMenuVisible] = React.useState(Boolean(openedInitially));
    const menuHeight = useRef(new Animated.Value(0)).current;
    const [itemHeights, setItemHeights] = useState<number[]>([]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    useEffect(() => {
        const totalHeight = itemHeights.reduce((sum, height) => sum + height, 0);
        Animated.timing(menuHeight, {
            toValue: menuVisible ? totalHeight : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [menuVisible, itemHeights]);

    const onItemLayout = (index: number) => (event: any) => {
        const { height } = event.nativeEvent.layout;
        setItemHeights((prevHeights) => {
            const newHeights = [...prevHeights];
            newHeights[index] = height;
            return newHeights;
        });
    };
    return (
        <View>
            <Header menuVisible={menuVisible} toggleMenu={toggleMenu} itemCount={itemHeights.length} />
            <Animated.View style={[styles.menu, { height: menuHeight }]}>
                {Components.map((Component, index) => (
                    <View key={index} onLayout={onItemLayout(index)} style={styles.menuItem}>
                        <Component />
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    menuItem: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});