import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { listStorys } from "../graphql/queries";

import Story from "./Story";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const storiesData = await API.graphql(graphqlOperation(listStorys));
      setStories(storiesData.data.listStorys.items);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={stories}
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
