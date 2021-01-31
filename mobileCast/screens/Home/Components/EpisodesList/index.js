import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';

import {Episode} from './../Episode';
import {styles} from './EpisodesList.style';
import {theme} from './../../../../utils/theme';

const {
  colors: {primary},
} = theme;

export const EpisodesList = () => {


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
