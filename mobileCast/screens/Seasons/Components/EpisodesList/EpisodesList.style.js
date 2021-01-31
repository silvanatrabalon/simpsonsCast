import {StyleSheet} from 'react-native';
import {theme} from './../../../../utils/theme';

const {
  colors: {primary},
} = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: primary['01'],
  },
});
