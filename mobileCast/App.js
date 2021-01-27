import React, { useState, useEffect } from 'react';
import styles from './main.style';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screens/DrawerContent';
import {
  FlatList,
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import playIcon from './assets/play.png';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './screens/ProfileScreen';
import SupportScreen from './screens/SupportScreen';

function cast(video) {
  GoogleCast.getCastDevice().then(console.log());
  GoogleCast.castMedia(video);
  GoogleCast.launchExpandedControls();
}

function registerListeners() {
  const events = `
    SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED
    SESSION_RESUMING SESSION_RESUMED SESSION_ENDING SESSION_ENDED
    MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED MEDIA_PROGRESS_UPDATED
    CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECEIVED
  `
    .trim()
    .split(/\s+/);

  events.forEach(event => {
    GoogleCast.EventEmitter.addListener(GoogleCast[event]);
  });
}

function RenderVideos({ item }) {
  const video = item;

  return (
    <TouchableOpacity
      key={video.title}
      onPress={() => cast(video)}
      style={styles.midiaContainer}>
      <View style={styles.preview} >
        <Image source={{ uri: video.imageUrl }} style={styles.renderImg} />
        <Image source={playIcon} style={styles.playImg} />
      </View>
      <View style={styles.textMidia}>
        <Text>{video.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
const HomeScreen = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    registerListeners();
    const CAST_VIDEOS_URL = 'http://190.19.242.3:3000/';
    fetch(CAST_VIDEOS_URL)
      .then(response => response.json())
      .then(data => {
        const path = data.Simpsons.path;
        const seasons = data.Simpsons.seasons;
         setVideos({
          video: seasons.map(season => (
            data.Simpsons[season].map(episode => (
              {
                title: episode.title,
                mediaUrl: path + season + '/' + episode.title + '.mp4',
                imageUrl: path + season + '/' + episode.image,
                posterUrl: path + season + '/' + episode.image
              }
            ))
          ))[0],
        });
      })
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={videos.video}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RenderVideos item={item} />}
      />
    </View>
  );
}


const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#fcdb00'
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'simpsonfont'
      },
      headerTitle: 'Les traigo Cast'
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} 
            backgroundColor='#fcdb00' color='black' onPress={() => {
            navigation.openDrawer()}}>
          </Icon.Button>
          ),
        headerRight: () => (
          <CastButton style={styles.castButton} />
        )
        }}/>
    </HomeStack.Navigator>
);

export default function Main() {
  return (
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} >
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};