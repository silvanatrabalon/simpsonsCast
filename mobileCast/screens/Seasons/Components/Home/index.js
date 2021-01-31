import React from 'react';
import {CastButton} from 'react-native-google-cast';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {EpisodesList} from './../EpisodesList';
import {styles} from './Home.style';

export const Home = ({navigation}) => {
  const HomeStackNavigation = createStackNavigator();

  return (
    <HomeStackNavigation.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fcdb00',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'simpsonfont',
        },
        headerTitle: 'Les traigo Cast',
      }}>
      <HomeStackNavigation.Screen
        name="Home"
        component={EpisodesList}
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
          headerRight: () => <CastButton style={styles.castButton} />,
        }}
      />
    </HomeStackNavigation.Navigator>
  );
};
