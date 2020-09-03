import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EvilIcon from "react-native-vector-icons/EvilIcons";

const ProfilePicture = ({ uri, size = 65 }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={[
          styles.linearGradient,
          { width: size + 5, height: size + 5, borderRadius: (size + 5) / 2 },
        ]}
        colors={["#833ab4", "#fd1d1d", "#fcb045"]}
      >
        {uri === "" ? (
          <EvilIcon style={styles.profileIcon} name="user" size={size + 5} />
        ) : (
          <Image
            style={[
              styles.image,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
            source={{ uri }}
          />
        )}
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderWidth: 2,
    borderColor: "#e3e3e3",
  },
  profileIcon: {
    color: "#343434",
  },
});
