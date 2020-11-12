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
        flex: 5,
        flexDirection: 'row',
    },
    backgroundImage: {
        resizeMode: 'contain',
        width: Dimensions.get('window').width,
        height: 300,
    },
    body: {
        flex: 5,
        // backgroundColor: 'blue',
    },
    footer: {
        flex: 1,
        // backgroundColor: 'brown',
        justifyContent: 'flex-end',
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
