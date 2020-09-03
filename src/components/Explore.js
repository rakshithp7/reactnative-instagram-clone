import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

import { listPosts } from "../graphql/queries";
import ExplorePost from "./ExplorePost";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postsData.data.listPosts.items);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <FlatList
      style={styles.exploreContainer}
      data={posts}
      numColumns={2}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ExplorePost post={item} />}
    />
  );
};

export default Explore;

const styles = StyleSheet.create({
  exploreContainer: {
    backgroundColor: "white",
    marginBottom: 50,
  },
});
