import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { listUsersWithStories } from "../graphql/queries";

import Story from "./Story";

const Stories = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersWithStories();
  }, []);

  const fetchUsersWithStories = async () => {
    try {
      const usersData = await API.graphql(
        graphqlOperation(listUsersWithStories)
      );
      setUsers(
        usersData.data.listUsers.items.filter((x) => x.stories.items.length > 0)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <FlatList
      style={styles.storiesContainer}
      data={users}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Story user={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  storiesContainer: {
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
  },
});
