import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Splash from './../Splash';
import SignIn from './../SignIn';
import SignUp from './../SignUp';

const RootStackNavigation = createStackNavigator();

const RootStack = ({navigation}) => (
  <RootStackNavigation.Navigator headerMode="none">
    <RootStackNavigation.Screen name="Splash" component={Splash} />
    <RootStackNavigation.Screen name="SignIn" component={SignIn} />
    <RootStackNavigation.Screen name="SignUp" component={SignUp} />
  </RootStackNavigation.Navigator>
);

export default RootStack;
