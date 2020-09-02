import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Auth } from "aws-amplify";

import FeatherIcon from "react-native-vector-icons/Feather";
import EvilIcon from "react-native-vector-icons/EvilIcons";

const ProfileHeader = ({ username }) => {
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Log Out", onPress: () => logout() },
      ],
      { cancelable: false }
    );
  };

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>

        <EvilIcon name="chevron-down" size={30} />
      </View>
      <TouchableWithoutFeedback onPress={handleLogout}>
        <FeatherIcon name="log-out" size={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  usernameContainer: {
    flexDirection: "row",
  },
  username: {
    fontSize: 18,
    fontFamily: "medium",
  },
});
