import {View, StatusBar, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import GoogleCast from 'react-native-google-cast';

import {theme} from './../../../../utils/theme';
import Season from './../Season';

const {
  colors: {primary},
} = theme;
const PATH = 'http://lestraigocast.ddns.net:3000/';

export const HomeScreen = () => {
  const [seasons, setSeasons] = useState([]);
  const [seasonsObj, setSeasonsObj] = useState([]);

  const events = `
  SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED
  SESSION_RESUMING SESSION_RESUMED SESSION_ENDING SESSION_ENDED
  MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED MEDIA_PROGRESS_UPDATED
  CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECEIVED
`
    .trim()
    .split(/\s+/);

  function registerListeners() {
    events.forEach(event => {
      GoogleCast.EventEmitter.addListener(GoogleCast[event]);
    });
  }

  function unRegisterListeners() {
    events.forEach(event => {
      GoogleCast.EventEmitter.removeListener(GoogleCast[event]);
    });
  }

  useEffect(() => {
    registerListeners();

    fetch(PATH)
      .then(response => response.json())
      .then(data => {
        setSeasons(data.Simpsons.seasons);
        setSeasonsObj(data.Simpsons.seasons.map(season => data.Simpsons[season]));
      })
      .catch(console.error);

    return () => unRegisterListeners();
  }, []);

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <FlatList
        data={seasonsObj}
        key={(item, index) => index.toString()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <Season title={seasons[index]} episodes={item} />}
      />      
    </View>
  );
};
