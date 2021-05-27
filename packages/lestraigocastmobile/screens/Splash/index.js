import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import imgSplash from './../../assets/img/burns.png';
import {styles} from './Splash.style';
import {theme} from './../../utils/theme';

const {
  colors: {primary},
} = theme;

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceInDown"
          duraton="2500"
          source={imgSplash}
          style={styles.imgSplash}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.textSplash}>Les traigo Cast</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <LinearGradient
              colors={[primary['01'], primary['02']]}
              style={styles.backgrodunButton}>
              <Text style={styles.textButton}>Venga el liquido</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Splash;
