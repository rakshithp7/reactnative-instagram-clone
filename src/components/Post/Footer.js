import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = ({ username, caption, likesCount, postedAt }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLikes}>
        <Text style={styles.likesCount}>{likesCount}</Text>
        <Text> likes</Text>
      </View>
      <View style={styles.containerName}>
        <Text style={styles.username}>{username}</Text>
        <Text>{caption}</Text>
      </View>
      <Text style={styles.postedAt}>{postedAt}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  containerLikes: {
    flexDirection: "row",
  },
  containerName: {
    flexDirection: "row",
  },
  likesCount: {
    fontWeight: "bold",
  },
  postedAt: {
    marginTop: 2,
    fontSize: 12,
    color: "gray",
  },
  username: {
    marginRight: 5,
    fontWeight: "bold",
  },
});
