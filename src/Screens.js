import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainNavigation from "./MainNavigation";
import StoryScreen from "./screens/StoryScreen";

const RootStack = createStackNavigator();

const Screens = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={"Main Navigation"}
        component={MainNavigation}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Story"
        component={StoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default Screens;
