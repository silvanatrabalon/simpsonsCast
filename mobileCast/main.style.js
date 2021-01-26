import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fcdb00',
  },
  toolbar: {
    marginTop: 20,
    margin: 20,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  castButton: {
    height: 24,
    width: 24,
    marginRight: 10,
    marginTop: 10,
    tintColor: 'black',
  },
  midiaContainer: {
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
  textMidia: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center'
  },
  textTitle: {
    alignSelf: 'center',
    fontFamily: 'simpsonfont',
    fontSize: 20
  },
  preview: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  }
});

export default styles;
