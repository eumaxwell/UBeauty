import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: Dimensions.get('window').width,
    marginTop: Constants.statusBarHeight + 20,
  },
  headerSearch: {
    // zIndex: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 60,
    borderRadius: 8,
    elevation: 10
  },
  logginButton: {},
  modal: {},
  modalButton: {},
  // body: { flex: 5 },
  bodyMap: {
    // marginTop: 100,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bodyAvatar: {},
  bodyCallout: {},
  bodyMakerName: {},
  bodyMakerBio: {},
  bodyMakerPrice: {},
});
