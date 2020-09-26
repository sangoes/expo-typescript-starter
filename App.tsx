import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import dva from './src/models/dva';
import models from './src/models/index';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import * as Colors from '@/styles/color';
import { Provider as AntProvider } from '@ant-design/react-native';

/**
 * dva
 */
const dvaApp: any = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();

/**
 * App Entry
 */
const App = () => {
  // state
  const [theme, setTheme] = React.useState({});

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AntProvider theme={theme}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </AntProvider>
    );
  }
};

export default App;
