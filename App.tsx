import Navigation from "@/navigation";
import { store } from "@/redux/store";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

/**
 * the app entry
 * @returns
 */
const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <Navigation />
          {/* <Navigation colorScheme={colorScheme} /> */}
          {/* <StatusBar /> */}
        </SafeAreaProvider>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
