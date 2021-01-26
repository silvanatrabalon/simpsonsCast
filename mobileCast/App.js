import React, {useState, useEffect} from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './main.style';
import GoogleCast, {CastButton} from 'react-native-google-cast';
import playIcon from './assets/play.png'


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
      <View style={styles.videoCard}>
        <Image source={{uri: video.imageUrl}} style={styles.renderImg} />
        <Image source={playIcon}  style={styles.playImg} />
      </View>
      <View style={styles.textMidia}>
        <Text>{video.title}</Text>
        <Text>{video.studio}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Main() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    registerListeners();

    const CAST_VIDEOS_URL =
      // 'http://186.137.233.93:3000/';
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/f.json';
    fetch(CAST_VIDEOS_URL)
      .then(response => response.json())
      .then(data => {
        const mp4Url = data.categories[0].mp4;
        const imagesUrl = data.categories[0].images;

        setVideos({
          video: data.categories[0].videos.map(video => ({
            title: video.title,
            subtitle: video.subtitle,
            studio: video.studio,
            duration: video.duration,
            // mediaUrl: video.sources[0].url,
            // imageUrl: video['image-480x270'],
            // posterUrl: video['image-780x1200'],
            mediaUrl: mp4Url + video.sources[0].url,
            imageUrl: imagesUrl + video['image-480x270'],
            posterUrl: imagesUrl + video['image-780x1200'],
          })),
        });
      })
      .catch(console.error);
  }, []); 

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.toolbar}>
          <CastButton style={styles.castButton} />

          <Button title="Desconectar" onPress={() => GoogleCast.endSession()} />

          <Button
            title="Abrir player"
            onPress={() => GoogleCast.launchExpandedControls()}
          />
        </View>
      </SafeAreaView>

      <FlatList
        data={videos.video}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RenderVideos item={item} />}
      />
    </View>
  );
}
