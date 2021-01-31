import {StyleSheet} from 'react-native';
import {theme} from '../../../../utils/theme';

const {
  sizes: {xSmall, medium},
  colors: {neutral},
} = theme;

export const styles = StyleSheet.create({
  castButton: {
    height: medium,
    width: medium,
    marginRight: xSmall,
    marginTop: xSmall,
    tintColor: neutral['02'],
  },
});
