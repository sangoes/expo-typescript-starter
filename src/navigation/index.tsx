import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "./tab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@/screens/notfound";
import LoginPage from "@/screens/auth/login";

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  showLabel: false,
  activeTintColor: "#9381ff",
  style: {
    height: "10%",
  },
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!", presentation: "modal" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          title: "Oops!",
          headerShown: true,
          // presentation: "formSheet",
        }}
      />
    </Stack.Navigator>
  );
};
