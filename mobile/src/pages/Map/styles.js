import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: "#13131a",
    fontWeight: "bold",
  },
  modal: {},
  modalButton: {},
  body: {flex: 5},
  bodyMap: {  },
  bodyAvatar: {},
  bodyCallout: {},
  bodyMakerName: {},
  bodyMakerBio: {},
  bodyMakerPrice: {},
});
