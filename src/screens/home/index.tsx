import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * the home page
 * @returns
 */
const HomePage = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Text>the home page</Text>
      <Button onPress={() => navigation.navigate("Login")}>Login</Button>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
