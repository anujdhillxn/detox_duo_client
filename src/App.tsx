import * as React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './state/AppContext';
import { AppScreenStack } from './features/AppScreenStack';
import { ApiProvider } from './api/ApiProvider';

export default function App() {
    return (
        <MenuProvider>
            <NavigationContainer>
                <ApiProvider>
                    <AppContextProvider>
                        <AppScreenStack />
                    </AppContextProvider>
                </ApiProvider>
            </NavigationContainer>

        </MenuProvider>
    );
}

