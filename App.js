import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

import Main from "./src/Main";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <Main />
    </SafeAreaView>
  );
}
