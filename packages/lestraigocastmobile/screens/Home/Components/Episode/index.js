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

  function formatTitle(videoToCast) {
    const title = videoToCast.title;
    const normalizedTitle = title.substring(19).substring(4).replace(/_/g, ' ');
    const episodeNumber = title.substring(19, 21);
    return `Episodio ${episodeNumber}: ${normalizedTitle}`;
  }

  function getImage(videoToCast, seasson) {
    const title = videoToCast.title;
    const episodeNumber = title.substring(19, 21);
    const url_image = images[seasson][episodeNumber - 1].image;
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
