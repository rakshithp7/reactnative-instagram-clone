import React from "react";
import { StyleSheet, Image, View } from "react-native";

const ProfilePicture = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    height: 76,
    width: 76,
    margin: 7,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#000",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
  },
});
