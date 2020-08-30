import React from "react";
import { StyleSheet, Image, View } from "react-native";

const ProfilePicture = ({ uri, size = 70 }) => {
  return (
    <View style={[styles.container, { width: size + 6, height: size + 6 }]}>
      <Image
        style={[styles.image, { width: size, height: size }]}
        source={{ uri }}
      />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    margin: 7,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#77009a",
  },
  image: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
  },
});
