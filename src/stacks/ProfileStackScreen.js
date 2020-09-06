import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SinglePostScreen from "../screens/SinglePostScreen";
import CommentsScreen from "../screens/CommentsScreen";

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
      <ProfileStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Comments",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
