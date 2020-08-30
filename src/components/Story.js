import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ProfilePicture from "./ProfilePicture";

const Story = ({ imageUri, name }) => {
  return (
    <View style={styles.container}>
      <ProfilePicture uri={imageUri} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  name: {
    textAlign: "center",
  },
});
