import React, {useState, useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../utils/theme';
import Season from './Components/Season';
import {CastButton} from 'react-native-google-cast';
import {styles} from  './Home.style'

const {
  colors: { primary }
} = theme;

const HomeStack = createStackNavigator();

const Screen = () => {
  const PATH = 'http://lestraigocast.ddns.net:3000/';
  const [videos, setVideos] = useState([]);

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

  useEffect(() => {
    registerListeners();
    fetch(PATH)
      .then(response => response.json())
      .then(data => {
        const seasons = data.Simpsons.seasons;
        setVideos({
          video: seasons.map(season =>
            data.Simpsons[season].map(episode => ({
              title: episode.title,
              mediaUrl: PATH + 'Simpsons/' + season + '/' + episode.title + '.mp4',
              imageUrl: PATH + 'Simpsons/' + season + '/' + episode.image,
              posterUrl: PATH + 'Simpsons/' + season + '/' + episode.image,
            })),
          )[0],
        });
      })
      .catch(console.error);
  }, []);

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <Season/>
    </View>
  );
};

const Home = ({ navigation }) => (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fcdb00',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'simpsonfont',
        },
      }}>
      <HomeStack.Screen
        name="Home"
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
          headerRight: () => <CastButton style={styles.castButton} />,
        }}
      />
    </HomeStack.Navigator>
  );
export default Home;