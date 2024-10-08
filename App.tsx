import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SignupScreen from './features/SignupScreen';
import { Duo, Rule, RuleType, User } from './types';
import { AppContext } from './contexts/useAppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserScreen from './features/UserScreen';
import { createApi } from './api/createApi';
import { ApiContext } from './contexts/useApi';
import { AppActions } from './contexts/useActions';
import LoginScreen from './features/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './features/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import RuleCreatorScreen from './features/RuleCreatorScreen';
import DuoScreen from './features/DuoScreen';
import { MenuProvider } from 'react-native-popup-menu';
import RuleEditorScreen from './features/RuleEditorScreen';

const Stack = createStackNavigator();
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  User: undefined;
  Home: undefined;
  RuleCreator: undefined;
  RuleEditor: Rule<RuleType>;
  Duo: undefined;
};

export default function App() {
  return (

    <MenuProvider>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>

    </MenuProvider>
  );
}

const MainScreen = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [myDuo, setMyDuo] = React.useState<Duo | null>(null);
  const [duoRequests, setDuoRequests] = React.useState<Duo[]>([]);
  const [rules, setRules] = React.useState<Rule<RuleType>[]>([]);
  const api = createApi();

  React.useEffect(() => {
    if (api.remote.requestToken) {
      api.userApi.getUser().then((userResp) => {
        setUser(userResp);
      }).catch((err) => {
        console.log(err);
        api.remote.setRequestToken(null);
      })
      AsyncStorage
        .setItem('userToken', api.remote.requestToken);
    }
  }, [api.remote.requestToken]);

  React.useEffect(() => {
    api.duoApi.getDuos().then((duoResp) => {
      setMyDuo(duoResp.myDuo.length ? duoResp.myDuo[0] : null);
      setDuoRequests(duoResp.requestsReceived);
    }).catch((err) => {
      console.log(err);
    })
  }, [user]);

  React.useEffect(() => {
    api.ruleApi.getRules().then((rulesResp) => {
      setRules(rulesResp);
    })
      .catch((err) => {
        console.log(err);
      })
  }, [myDuo])

  return <ApiContext.Provider value={api}>
    <AppContext.Provider value={{ user, myDuo, duoRequests, rules }}>
      <AppActions.Provider value={{ setUser, setMyDuo, setDuoRequests, setRules }}>
        <View style={styles.container}>
          {user ? <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Duo')}>
                      <Icon5 name="user-friends" size={30} color="#000" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('User')}>
                      <Icon name="user" size={30} color="#000" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="RuleCreator" component={RuleCreatorScreen} />
            <Stack.Screen name="Duo" component={DuoScreen} />
            <Stack.Screen name="RuleEditor" component={RuleEditorScreen} />
          </Stack.Navigator> : <Stack.Navigator initialRouteName={"Login"} >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>}

          <StatusBar style="auto" />
        </View>
      </AppActions.Provider>
    </AppContext.Provider>
  </ApiContext.Provider>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigatorContainer: {
    flex: 1,
  },
});
