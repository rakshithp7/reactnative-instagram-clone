import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import Screens from "./src/Screens";

import config from "./aws-exports";
Amplify.configure(config);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <Screens />
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
