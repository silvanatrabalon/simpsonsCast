import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

const {
  sizes: {xSmall, medium},
  colors: {neutral},
} = theme;

export const styles = StyleSheet.create({
  castButton: {
    width: medium,
    height: medium,
    marginTop: xSmall,
    marginRight: xSmall,
    tintColor: neutral['02'],
  },
});
