import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewPostScreen from "../screens/NewPostScreen";
import NewPostInfoScreen from "../screens/NewPostInfoScreen";

const NewPostStack = createStackNavigator();

const NewPostStackScreen = () => {
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          headerShown: false,
        }}
      />
      <NewPostStack.Screen
        name="NewPostInfo"
        component={NewPostInfoScreen}
        options={{
          title: "Create a post",
        }}
      />
    </NewPostStack.Navigator>
  );
};

export default NewPostStackScreen;
