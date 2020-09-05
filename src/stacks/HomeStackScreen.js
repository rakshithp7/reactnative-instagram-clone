import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  const navigation = useNavigation();

  const openNewStoryScreen = () => {
    navigation.navigate("NewStory");
  };

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
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
            <TouchableOpacity onPress={openNewStoryScreen}>
              <SimpleLineIcon name="camera" size={25} color={"black"} />
            </TouchableOpacity>
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
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
