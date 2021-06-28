import React from 'react';
import {FlatList} from 'react-native';

import {Episode} from './../Episode';

export const EpisodesList = ({videos, season}) => {
  return (
    <FlatList
      data={videos}
      key={(item, index) => index.toString()}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <Episode video={item} season={season} />}
    />
  );
};
