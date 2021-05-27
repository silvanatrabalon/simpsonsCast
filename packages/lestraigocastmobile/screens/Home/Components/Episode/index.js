import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {useRemoteMediaClient} from 'react-native-google-cast';

import playIcon from './../../../../assets/img/play.png';
import {styles} from './Episode.style';
import images from './../../../../model/data.json';

export const Episode = ({video, season}) => {
  const client = useRemoteMediaClient();

  function cast(videoToCast) {
    client?.loadMedia({
      mediaInfo: {
        autoplay: true,
        contentUrl: videoToCast,
      },
    });
  }

  // eslint-disable-next-line no-shadow
  function formatTitle(video) {
    const title = video.title;
    // eslint-disable-next-line no-shadow
    const formatTitle = title.substring(19).substring(4).replace(/_/g, ' ');
    const episodeNumber = title.substring(19, 21);
    return `Episodio ${episodeNumber}: ${formatTitle}`;
  }

  // eslint-disable-next-line no-shadow
  function getImage(video, season) {
    const title = video.title;
    const episodeNumber = title.substring(19, 21);
    const url_image = images[season][episodeNumber - 1].image;
    return url_image;
  }

  return (
    <TouchableOpacity
      key={video.title}
      onPress={() => cast(video.mediaUrl)}
      style={styles.mediaContainer}>
      <View style={styles.preview}>
        <Image
          source={{uri: getImage(video, season)}}
          style={styles.renderImg}
        />
        <Image source={playIcon} style={styles.playImg} />
      </View>
      <View style={styles.textMedia}>
        <Text>{formatTitle(video)}</Text>
      </View>
    </TouchableOpacity>
  );
};
