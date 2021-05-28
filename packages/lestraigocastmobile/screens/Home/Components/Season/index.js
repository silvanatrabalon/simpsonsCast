import React from 'react';
import {Text} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {EpisodesList} from './../EpisodesList';
import {styles} from './Season.style';

const Season = ({title, episodes}) => {
  const PATH = 'http://lestraigocast.ddns.net:3000/';

  const episodesArray = episodes
    ? episodes.map(episode => ({
        title: episode.title,
        mediaUrl: PATH + 'Simpsons/' + title + '/' + episode.title + '.mp4',
        imageUrl: PATH + 'Simpsons/' + title + '/' + episode.image,
        posterUrl: PATH + 'Simpsons/' + title + '/' + episode.image,
      }))
    : [];

  function formatTitle(titleSea) {
    const titleSeasson = titleSea.substring(1);
    return titleSeasson;
  }

  return (
    <Collapse style={styles.container}>
      <CollapseHeader style={styles.header}>
        <Text style={styles.textHeader}>Temporada {formatTitle(title)}</Text>
      </CollapseHeader>
      <CollapseBody>
        <EpisodesList videos={episodesArray} season={formatTitle(title)} />
      </CollapseBody>
    </Collapse>
  );
};

export default Season;
