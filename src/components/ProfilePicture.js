import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProfilePicture = ({ uri, size = 65 }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.linearGradient, { width: size + 5, height: size + 5 }]}
        colors={["#833ab4", "#fd1d1d", "#fcb045"]}
      >
        <Image
          style={[styles.image, { width: size, height: size }]}
          source={{ uri }}
        />
      </LinearGradient>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    margin: 7,
  },
  linearGradient: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
  },
});
