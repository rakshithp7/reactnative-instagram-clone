import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProfilePicture from "./ProfilePicture";

const Story = ({ user }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Story", { userId: user.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ProfilePicture uri={user.imageUri} />
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
};

export default Story;

const styles = StyleSheet.create({
  name: {
    textAlign: "center",
  },
});
