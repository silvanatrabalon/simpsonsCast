import React from 'react';
import {CastButton} from 'react-native-google-cast';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

import {styles} from './Home.style';
import {theme} from '../../utils/theme';
import {HomeScreen} from './Components/HomeScreen';

const {
  colors: {primary, neutral},
  sizes: {medium},
} = theme;

const HomeStack = createStackNavigator();

const Home = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: primary['01'],
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'simpsonfont',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={medium}
            backgroundColor={primary['01']}
            color={neutral['02']}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <CastButton style={styles.castButton} />,
      }}
    />
  </HomeStack.Navigator>
);
export default Home;
