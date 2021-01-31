import React, {useState, useEffect} from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import GoogleCast from 'react-native-google-cast';

import {Episode} from './../Episode';
import {styles} from './EpisodesList.style';
import {theme} from './../../../../utils/theme';

const {
  colors: {primary},
} = theme;

export const EpisodesList = () => {
  const PATH = 'http://lestraigocast.ddns.net:3000/';
  const [videos, setVideos] = useState([]);

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
              mediaUrl:
                PATH + 'Simpsons/' + season + '/' + episode.title + '.mp4',
              imageUrl: PATH + 'Simpsons/' + season + '/' + episode.image,
              posterUrl: PATH + 'Simpsons/' + season + '/' + episode.image,
            })),
          )[10],
        });
      })
      .catch(console.error);
  }, []);

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <FlatList
        data={videos.video}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Episode video={item} />}
      />
    </View>
  );
};
