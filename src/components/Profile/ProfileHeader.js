import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OctIcon from "react-native-vector-icons/Octicons";
import EvilIcon from "react-native-vector-icons/EvilIcons";

const ProfileHeader = ({ username }) => {
  return (
    <View style={styles.container}>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>
        <EvilIcon name="chevron-down" size={30} />
      </View>
      <OctIcon name="three-bars" size={30} />
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
