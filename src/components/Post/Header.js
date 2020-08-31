import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import ProfilePicture from "../ProfilePicture";

const Header = ({ imageUri, name }) => {
  return (
    <View style={styles.container}>
      <ProfilePicture uri={imageUri} size={35} />
      <Text style={styles.name}>{name}</Text>
      <Icon style={styles.dotsIcon} name="dots-three-vertical" size={18} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingLeft: 8,
  },
  dotsIcon: {
    marginRight: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    color: "#101010",
  },
});
