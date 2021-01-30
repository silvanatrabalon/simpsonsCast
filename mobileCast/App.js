import React, {useState, useEffect} from 'react';
import styles from './main.style';
import GoogleCast, {CastButton} from 'react-native-google-cast';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './screens/Drawer';
import {View, ActivityIndicator} from 'react-native';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from './components/context';
import RootStack from './screens/RootStack';
import AsyncStorage from '@react-native-community/async-storage';
import playIcon from './assets/play.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from './screens/Profile';
import Support from './screens/Support';

export default function Main() {
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

  function RenderVideos({item}) {
    const video = item;

    return (
      <TouchableOpacity
        key={video.title}
        onPress={() => cast(video)}
        style={styles.midiaContainer}>
        <View style={styles.preview}>
          <Image source={{uri: video.imageUrl}} style={styles.renderImg} />
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
      const CAST_VIDEOS_URL = 'http://lestraigocast.ddns.net:3000/';
      fetch(CAST_VIDEOS_URL)
        .then(response => response.json())
        .then(data => {
          const path = data.Simpsons.path;
          const seasons = data.Simpsons.seasons;
          setVideos({
            video: seasons.map(season =>
              data.Simpsons[season].map(episode => ({
                title: episode.title,
                mediaUrl: path + season + '/' + episode.title + '.mp4',
                imageUrl: path + season + '/' + episode.image,
                posterUrl: path + season + '/' + episode.image,
              })),
            )[0],
          });
        })
        .catch(console.error);
    }, []);

    return (
      <View style={styles.container}>
        <FlatList
          data={videos.video}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <RenderVideos item={item} />}
        />
      </View>
    );
  };
  const HomeStackNavigation = createStackNavigator();
  const DrawerNavigation = createDrawerNavigator();
  const HomeStackScreen = ({navigation}) => (
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
        component={HomeScreen}
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

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <DrawerNavigation.Navigator
            initialRouteName="Home"
            drawerContent={props => <DrawerContent {...props} />}>
            <DrawerNavigation.Screen name="Home" component={HomeStackScreen} />
            <DrawerNavigation.Screen name="Profile" component={Profile} />
            <DrawerNavigation.Screen name="Support" component={Support} />
          </DrawerNavigation.Navigator>
        ) : (
          <RootStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
