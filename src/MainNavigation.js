import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EvilIcon from "react-native-vector-icons/EvilIcons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { Auth, API, graphqlOperation } from "aws-amplify";

import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { userByUsername } from "./graphql/queries";

import HomeStackScreen from "./stacks/HomeStackScreen";
import ExploreStackScreen from "./stacks/ExploreStackScreen";
import NewPostStackScreen from "./stacks/NewPostStackScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileStackScreen from "./stacks/ProfileStackScreen";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const [authenticatedUsername, setAuthenticatedUsername] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    Auth.currentUserInfo().then((res) => {
      setAuthenticatedUsername(res.username);
    });

    fetchUserDetails();
  }, [authenticatedUsername]);

  const fetchUserDetails = async () => {
    try {
      const userData = await API.graphql(
        graphqlOperation(userByUsername, { username: authenticatedUsername })
      );

      dispatch({
        type: actionTypes.SET_USER,
        user: userData.data.userByUsername.items[0],
      });
    } catch (err) {
      console.log("Error getting userByUsername:", err.errors[0].message);
    }
  };

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
      <Tab.Screen name="NewPost" component={NewPostStackScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
