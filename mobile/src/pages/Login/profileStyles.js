import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    header: {
        flex: 2,
        flexDirection: 'row',
    },
    actionBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'green',
    },
    body: {
        flex: 9,
        // backgroundColor: 'blue',
    },
    headerImage: {
        flex: 1,
        // backgroundColor: 'red',
    },
    headerContent: {
        flex: 2,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "bold",
    },
    headerDescription: {
        fontSize: 14,
        opacity: 0.6
    },
    footer: {
        flex: 1,
        // backgroundColor: 'brown',
        justifyContent: 'flex-end',
    },
    bodyContent: {
        flex: 1,
    },
    button: {
        width: '100%',
        elevation: 1,
        borderWidth: 0,
        marginTop: 8,
        height: 54,
        justifyContent: 'center'
    },

});
