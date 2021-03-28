import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native'
import GoogleCast from 'react-native-google-cast';

import playIcon from './../../../../assets/play.png';
import {styles} from './Episode.style';

export const Episode = ({video}) => {
  
  function cast(videoToCast) {
    GoogleCast.getCastDevice().then(console.log());
    GoogleCast.castMedia(videoToCast);
    GoogleCast.launchExpandedControls();
  };

  function formatTitle (video) {
    const title = video.title;
    const formatTitle = title.substring(19).substring(4).replace(/_/g,' ');
    const episodeNumber = title.substring(19, 21);
    return `Episodio ${episodeNumber}: ${formatTitle}`;
  }

  return (
    <TouchableOpacity
      key={video.title}
      onPress={() => cast(video)}
      style={styles.mediaContainer}>
      <View style={styles.preview}>
        <Image source={{uri: video.imageUrl}} style={styles.renderImg} />
        <Image source={playIcon} style={styles.playImg} />
      </View>
      <View style={styles.textMedia}>
        <Text>{formatTitle(video)}</Text>
      </View>
    </TouchableOpacity>
  );
};
