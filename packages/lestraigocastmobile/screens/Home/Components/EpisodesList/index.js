import React from 'react';
import {FlatList} from 'react-native';

import {Episode} from './../Episode';

export const EpisodesList = ({videos, season}) => {
  return (
    <FlatList
      data={videos}
      key={(_item, index) => index.toString()}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({item}) => (
        <Episode video={item} videos={videos} season={season} />
      )}
    />
  );
};
