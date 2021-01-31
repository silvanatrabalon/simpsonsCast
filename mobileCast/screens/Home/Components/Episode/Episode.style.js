import {StyleSheet} from 'react-native';
import {theme} from './../../../../utils/theme';

const {
  sizes: {xSmall, xLarge},
} = theme;

export const styles = StyleSheet.create({
  mediaContainer: {
    padding: xSmall,
    flexDirection: 'row',
  },
  renderImg: {
    width: 160,
    height: 90,
  },
  playImg: {
    width: xLarge,
    height: xLarge,
    marginLeft: 120,
    position: 'absolute',
    marginTop: xLarge +10,
  },
  textMedia: {
    flex: 1,
    marginLeft: xSmall,
    alignSelf: 'center'
  },
});
