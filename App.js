import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import HomeScreen from "./src/screens/HomeScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import NewPostScreen from "./src/screens/NewPostScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return (
                <FoundationIcon name="home" size={size + 5} color={color} />
              );
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="NewPost" component={NewPostScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
