import React from "react";
import { StyleSheet, FlatList } from "react-native";

import storiesData from "../data/StoriesData";
import Story from "./Story";

const Stories = () => {
  return (
    <FlatList
      style={styles.container}
      data={storiesData}
      keyExtractor={({ user: { id } }) => id}
      renderItem={({ item }) => <Story user={item.user} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
  },
});
