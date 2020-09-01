import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewPostScreen from "../screens/NewPostScreen";

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
    </NewPostStack.Navigator>
  );
};

export default NewPostStackScreen;
