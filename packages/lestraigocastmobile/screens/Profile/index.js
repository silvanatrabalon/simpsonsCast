import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import styles from './../../main.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from './../../utils/theme';

const {
  colors: {primary},
} = theme;

const ProfileStack = createStackNavigator();

const Screen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <Text>En construcción</Text>
    </View>
  );
};

const Profile = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fcdb00',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'simpsonfont',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={Screen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fcdb00"
            color="black"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
);

export default Profile;
