import {StyleSheet} from 'react-native';
import {theme} from './../../utils/theme';

const {
  typography: {fontFamily, fontSize},
  colors: {primary, neutral, message},
  sizes: {xSmall, small, medium, large, xLarge},
} = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary['01'],
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: medium,
  },
  textHeader: {
    fontFamily: fontFamily,
    fontSize: fontSize.large,
  },
  footer: {
    flex: 5,
    backgroundColor: neutral['01'],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: large,
  },
  label: {
    fontFamily: fontFamily,
  },
  input: {
    flexDirection: 'row',
    marginTop: small,
    borderBottomWidth: 1,
    borderBottomColor: neutral['04'],
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: xSmall,
    color: neutral['02'],
  },
  errorMsg: {
    color: message.alert,
    fontSize: small - 2,
  },
  textAnchor: {
    color: neutral['02'],
    marginTop: xSmall,
    textDecorationLine: 'underline',
    position: 'absolute'
  },
  buttonContent: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  textButton: {
    color: neutral['02'],
    fontFamily: fontFamily,
    fontSize: fontSize.small,
  },
  button: {
    width: '100%',
    height: xLarge,
    borderRadius: large,
    marginTop: large,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
