import React, {useEffect} from 'react';
import {Animated, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Menus from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {styles} from './Support.style';

const SupportStack = createStackNavigator();

const Screen = () => {
  const rotateValue = new Animated.Value(0);
  const rotate = rotateValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.timing(rotateValue, { toValue: 200, duration: 55000, useNativeDriver: true}).start();
  }, [rotateValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/react.png')}
        style={[styles.logo, { transform: [{ rotate }] }]}
      />
      <Text style={styles.text}>
        Para contactar a los desarrolladores de  
      </Text>
      <Text style= {styles.name}>
        Les Traigo Cast
      </Text> 
      <Text style={styles.text}>
         y dar cualquier crítica constructiva, hacer consultas o simplemente hablar de Los Simpsons podes hacerlo escribiendo a: 
      </Text>
      <View>
        <Text>
          <Icon name="email" size={15} />
          {" "}mdq123456@gmail.com
        </Text>
        <Text>
          <Icon name="email" size={15} />
          {" "}silvana.trabalon@gmail.com
        </Text>
      </View>
    </View>
  );
};

const Support = ({navigation}) => (
  <SupportStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fcdb00',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'simpsonfont',
      },
    }}>
    <SupportStack.Screen
      name="Support"
      component={Screen}
      options={{
        headerLeft: () => (
          <Menus.Button
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
  </SupportStack.Navigator>
);

export default Support;
