import { DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: 'purple',
        accent: '#f1c40f',
    },
    button: {
        marginVertical: 24
    }
};

export default theme;