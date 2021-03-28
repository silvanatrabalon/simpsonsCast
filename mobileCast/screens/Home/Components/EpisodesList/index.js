import React from 'react';
import {FlatList} from 'react-native';

import {Episode} from './../Episode';
import {theme} from './../../../../utils/theme';

const {
  colors: {primary},
} = theme;

export const EpisodesList = ({videos}) => {
  return (
    <FlatList
      data={videos}
      key={(item, index) => index.toString()}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <Episode video={item} />}
    />
  );
};
