import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainNavigation from "./MainNavigation";
import StoryScreen from "./screens/StoryScreen";
import NewStoryScreen from "./screens/NewStoryScreen";

const RootStack = createStackNavigator();

const Screens = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main Navigation"
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
      <RootStack.Screen
        name="NewStory"
        component={NewStoryScreen}
        options={{
          title: "Back to Home",
        }}
      />
    </RootStack.Navigator>
  );
};

export default Screens;
