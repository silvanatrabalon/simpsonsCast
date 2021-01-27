import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer } from 'react-native-paper';
import styles from '../main.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userImage from '../assets/user.png';


export function DrawerContent(props) {
    return (
        <View style={{ flex: 1 }, styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={userImage}
                                size={50}
                            />
                        </View>
                        <View style={{ position: 'absolute', marginTop: 15, marginLeft: 100 }}>
                            <Title style={styles.title}>Diego Quintana</Title>
                            <Caption style={styles.caption}>@mdq123456</Caption>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>20</Paragraph>
                                <Caption style={styles.caption}>Temporadas</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="play-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Temporadas"
                            onPress={() => { props.navigation.navigate('Temporadas') }}
                        />
                    </Drawer.Section>


                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='exit-to-app'
                            color={color}
                            size={size}
                        />
                    )}
                    label='Sign out'
                    onPress={() => { }}
                />

            </Drawer.Section>
        </View>
    )
};

