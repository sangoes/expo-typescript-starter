import HomePage from "@/screens/home";
import MePage from "@/screens/me";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Tab = createBottomTabNavigator();

/**
 * the bottom navigator
 * @returns
 */
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie-filter" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={MePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
