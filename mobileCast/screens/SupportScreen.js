import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../main.style';
import Icon from 'react-native-vector-icons/Ionicons';


const SupportStack = createStackNavigator();


const Screen = () => {
    return (
      <View style={styles.container}>
        <Text>Support Screen</Text>
      </View>
    );
};

const SupportScreen = ({ navigation }) => (
    <SupportStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#fcdb00'
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'simpsonfont'
      }
    }}>
      <SupportStack.Screen name="Support" component={Screen} options={{
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} 
            backgroundColor='#fcdb00' color='black' onPress={() => {
            navigation.openDrawer()}}>
          </Icon.Button>
          )
        }}/>
    </SupportStack.Navigator>
);

export default SupportScreen;

