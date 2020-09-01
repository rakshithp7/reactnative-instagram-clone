import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SinglePost from "../components/SinglePost";

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
        component={SinglePost}
        options={{
          title: "Post",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
