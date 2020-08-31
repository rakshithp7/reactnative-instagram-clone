import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Screens from "./src/Screens";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <Screens />
    </NavigationContainer>
  );
};

export default App;
