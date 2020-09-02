import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SinglePostScreen from "../screens/SinglePostScreen";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="SinglePost"
        component={SinglePostScreen}
        options={{
          title: "Post",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
