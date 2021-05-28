import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

const {
  colors: {primary},
  typography: {fontFamily},
} = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: primary['01'],
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    margin: 25,
    justifyContent: 'center',
    textAlign: 'justify',
  },
  name: {
    fontFamily: fontFamily,
  },
});
