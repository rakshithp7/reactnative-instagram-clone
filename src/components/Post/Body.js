import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

const Body = ({ imageUri }) => {
  return <Image style={styles.image} source={{ uri: imageUri }} />;
};

export default Body;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 400,
  },
});
