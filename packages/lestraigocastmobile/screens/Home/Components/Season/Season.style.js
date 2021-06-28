import {StyleSheet} from 'react-native';
import {theme} from '../../../../utils/theme';

const {
  sizes: {xSmall, small},
  colors: {primary},
  typography: {fontSize},
} = theme;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: primary['01'],
  },
  header: {
    margin: 3,
    padding: small,
    alignItems: 'center',
    borderRadius: xSmall,
    backgroundColor: primary['01'],
    shadowColor: primary['02'],
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  textHeader: {
    fontSize: fontSize.small,
  },
});
