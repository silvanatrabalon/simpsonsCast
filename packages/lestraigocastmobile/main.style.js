import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fcdb00',
  },
  typography: {
    fontFamily: 'simpsonfont',
    fontSize: 16,
  },
  castButton: {
    height: 24,
    width: 24,
    marginRight: 10,
    marginTop: 10,
    tintColor: 'black',
  },
  mediaContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  renderImg: {
    width: 160,
    height: 90,
  },
  playImg: {
    width: 40,
    height: 40,
    position: 'absolute',
    marginLeft: 120,
    marginTop: 50,
  },
  textMedia: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center',
  },
  textTitle: {
    alignSelf: 'center',
    fontFamily: 'simpsonfont',
    fontSize: 20,
  },
  preview: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
});

export default styles;
