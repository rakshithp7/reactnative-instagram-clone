import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ProfileInfo = ({ name, imageUri }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: imageUri }}
        resizeMode="contain"
      />
      <Text style={styles.name}>Welcome {name}!</Text>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 18,
    fontFamily: "medium",
  },
});
