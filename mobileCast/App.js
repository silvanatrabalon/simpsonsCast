import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

import Home from './screens/Home';
import Profile from './screens/Profile';
import Support from './screens/Support';
import {AuthContext} from './components/context';
import RootStack from './screens/RootStack';
import {DrawerContent} from './screens/Drawer';

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const DrawerNavigation = createDrawerNavigator();

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_INFO':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem('userName', userName);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => { },
      updateProfile: () => { },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userName;
      userName = null;
      try {
        userName = await AsyncStorage.getItem('userName');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_INFO', id: userName });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userName !== null ? (
          <DrawerNavigation.Navigator
            initialRouteName="Home"
            drawerContent={props => <DrawerContent {...props} loginState={loginState} />}>
            <DrawerNavigation.Screen name="Home" component={Home} />
            <DrawerNavigation.Screen name="Profile" component={Profile} />
            <DrawerNavigation.Screen name="Support" component={Support} />
          </DrawerNavigation.Navigator>
        ) : (
          <RootStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
