import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import HomeScreen from "../screens/HomeScreen";
import NewPostScreen from "../screens/NewPostScreen";
import NewPostInfoScreen from "../screens/NewPostInfoScreen";

const NewPostStack = createStackNavigator();

const NewPostStackScreen = () => {
  return (
    <NewPostStack.Navigator initialRouteName="NewPost">
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
      <NewPostStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require("../../assets/instagram-text.png")}
              style={{ width: 120 }}
              resizeMode="contain"
            />
          ),
          headerTitleContainerStyle: {
            alignItems: "center",
          },
          headerLeft: () => (
            <SimpleLineIcon name="camera" size={25} color={"black"} />
          ),
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerRight: () => <SimpleLineIcon name="paper-plane" size={23} />,
          headerRightContainerStyle: {
            marginRight: 15,
          },
        }}
      />
    </NewPostStack.Navigator>
  );
};

export default NewPostStackScreen;
