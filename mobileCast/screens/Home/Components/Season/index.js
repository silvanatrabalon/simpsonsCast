import React from 'react';
import { Text } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import {EpisodeList} from './../EpisodeList';

const Season = ({ navigation }) => {


 
  return (
    <Collapse>
      <CollapseHeader>
        <Text>FORWARD</Text>
      </CollapseHeader>
      <CollapseBody>
        <Text>Aaron Bennet</Text>
      </CollapseBody>
    </Collapse>

  );
};

export default Season;