import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ExploreScreen from "../screens/ExploreScreen";
import SinglePostScreen from "../screens/SinglePostScreen";

const ExploreStack = createStackNavigator();

const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExploreStack.Screen
        name="SinglePost"
        component={SinglePostScreen}
        options={{
          title: "Post",
        }}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreStackScreen;
