import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 24,

  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 20,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: "#13131a",
    fontWeight: "bold"
  },
  body: {
    flex: 5,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    padding: 24,
    borderRadius: 8,
  },
  bodyAuth: {
    backgroundColor: '#CECECE',
    height: 100,
    marginVertical: 16,
  },
  bodyLogin: {
    marginVertical: 16,
    flexDirection: 'column',
  },
  bodyInput: {
    backgroundColor: 'white',
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold"
  },
  button: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 8,
    height: 54,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  detailsButtonText: {
    color: "#e02041",
    fontSize: 15,
    fontWeight: "bold"
  }
});
