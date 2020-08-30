import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ProfilePicture from "../ProfilePicture";

const Header = ({ imageUri, name }) => {
  return (
    <View style={styles.container}>
      <ProfilePicture uri={imageUri} size={40} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  name: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "#101010",
  },
});
