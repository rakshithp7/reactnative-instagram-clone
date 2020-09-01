import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";

import Screens from "./src/Screens";

import config from "./aws-exports";
Amplify.configure(config);

const App = () => {
  const [fontsLoaded] = useFonts({
    light: Roboto_300Light,
    regular: Roboto_400Regular,
    medium: Roboto_500Medium,
    bold: Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <Screens />
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
