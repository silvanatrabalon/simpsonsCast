import React, { useContext } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { AuthContext } from './../../components/context';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userImage from './../../assets/user.png';
import { styles } from './Drawer.style';
import { theme } from './../../utils/theme';

const {
  sizes: { xLarge },
} = theme;

export function DrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.header}>
            <View style={styles.imageHeader}>
              <Avatar.Image source={userImage} size={xLarge} />
            </View>
            <View style={styles.textHeader}>
              <Title>Diego Quintana</Title>
              <Caption style={styles.caption}>@mdq123456</Caption>
            </View>
          </View>
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar Sesión"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
