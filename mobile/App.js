import React from 'react';
import Routes from './src/routes';
import theme from './src/theme/theme'
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  )
}