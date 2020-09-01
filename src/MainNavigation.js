import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EvilIcon from "react-native-vector-icons/EvilIcons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import HomeStackScreen from "./stacks/HomeStackScreen";
import ExploreStackScreen from "./stacks/ExploreStackScreen";
import NewPostScreen from "./screens/NewPostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <FoundationIcon name="home" size={size + 5} color={color} />;
          }
          if (route.name === "Explore") {
            return <EvilIcon name="search" size={size + 10} color={color} />;
          }
          if (route.name === "NewPost") {
            return (
              <FontAwesomeIcon
                name="plus-square-o"
                size={size + 5}
                color={color}
              />
            );
          }
          if (route.name === "Notifications") {
            return <AntDesignIcon name="hearto" size={size} color={color} />;
          }
          if (route.name === "Profile") {
            return <EvilIcon name="user" size={size + 10} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Explore" component={ExploreStackScreen} />
      <Tab.Screen name="NewPost" component={NewPostScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
