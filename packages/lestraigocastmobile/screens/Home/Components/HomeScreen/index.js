import {View, StatusBar, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from './../../../../utils/theme';
import Season from './../Season';

const {
  colors: {primary},
} = theme;
const PATH = 'http://lestraigocast.ddns.net:3000/';

export const HomeScreen = () => {
  const [seasons, setSeasons] = useState([]);
  const [seasonsObj, setSeasonsObj] = useState([]);

  useEffect(() => {
    fetch(PATH)
      .then(response => response.json())
      .then(data => {
        setSeasons(data.Simpsons.seasons);
        setSeasonsObj(
          data.Simpsons.seasons.map(season => data.Simpsons[season]),
        );
      })
      .catch(console.error);
  }, []);

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <FlatList
        data={seasonsObj}
        key={(item, index) => index.toString()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <Season title={seasons[index]} episodes={item} />
        )}
      />
    </View>
  );
};
