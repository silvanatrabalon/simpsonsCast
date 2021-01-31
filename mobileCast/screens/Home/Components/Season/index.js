import React from 'react';
import {Text} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {EpisodesList} from './../EpisodesList';

const Season = ({title, episodes}) => {
  const PATH = 'http://lestraigocast.ddns.net:3000/';

  const episodesArray = episodes ? episodes.map(episode => ({
    title: episode.title,
    mediaUrl: PATH + 'Simpsons/' + title + '/' + episode.title + '.mp4',
    imageUrl: PATH + 'Simpsons/' + title + '/' + episode.image,
    posterUrl: PATH + 'Simpsons/' + title + '/' + episode.image,
  })) : [];
  
  return (
    <Collapse>
      <CollapseHeader>
        <Text>{title}</Text>
      </CollapseHeader>
      <CollapseBody>
        <EpisodesList videos={episodesArray} />
      </CollapseBody>
    </Collapse>
  );
};

export default Season;
