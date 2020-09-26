import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

/**
 * @description load cache
 * @author jerry.c
 * @date 2020-09-24
 * @export
 * @returns
 */
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
          antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
          antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    // loading
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
