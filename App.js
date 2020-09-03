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

import SignIn from "./src/components/Auth/SignIn";
import SignUp from "./src/components/Auth/SignUp";
import ForgotPassword from "./src/components/Auth/ForgotPassword";
import ConfirmSignUp from "./src/components/Auth/ConfirmSignUp";

import Screens from "./src/Screens";

import { StateProvider } from "./src/StateProvider";
import reducer, { initialState } from "./src/reducer";

import config from "./aws-exports";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

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
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <Screens />
      </NavigationContainer>
    </StateProvider>
  );
};

export default withAuthenticator(App, false, [
  <SignIn />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
]);
