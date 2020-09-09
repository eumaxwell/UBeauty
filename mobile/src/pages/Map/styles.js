import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: "#13131a",
    fontWeight: "bold",
  },
  logginButton: {},
  modal: {},
  modalButton: {},
  body: { flex: 5 },
  bodyMap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bodyAvatar: {},
  bodyCallout: {},
  bodyMakerName: {},
  bodyMakerBio: {},
  bodyMakerPrice: {},
});
