import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerAvatar: {},
  headerTitle: {},
  headerDescription: {},
  
  actionBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {},
  buttonText: {},

  body: {flex: 1,},
  actionTitle: {},
  
  
  galery: {},

  servicesList: {
    backgroundColor: 'white'
  },
  service: {},
  serviceDescription: {},
  servicePrice: {},
  
  
  
});
