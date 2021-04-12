import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './../../utils/theme';

const {
  typography: {fontFamily, fontSize},
  colors: {primary, neutral},
  sizes: {xSmall, small, large, xLarge},
} = theme;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.30;
const textStyles = {
  textAlign: 'center',
  color: neutral['02'],
  fontFamily: fontFamily,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary['01'],
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: primary['01'],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  imgSplash: {
    width: height_logo,
    height: height_logo,
  },
  textSplash: {
    fontSize: fontSize.large,
    ...textStyles,
  },
  button: {
    right: 30,
    bottom: 30,
    position: 'absolute',
  },
  backgrodunButton: {
    width: xLarge * 3,
    height: xLarge * 2,
    paddingVertical: small,
    paddingHorizontal: xSmall,
    borderRadius: large,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: fontSize.small,
    ...textStyles,
  },
});
