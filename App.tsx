import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import dva from './src/models/dva';
import models from './src/models/index';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

/**
 * dva
 */
const dvaApp: any = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();

/**
 * Theme
 */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

/**
 * App Entry
 */
const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }
};

export default App;
