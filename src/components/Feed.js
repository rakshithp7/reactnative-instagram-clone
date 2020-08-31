import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

import Stories from "./Stories";
import Post from "./Post/Post";
import { listPosts } from "../graphql/queries";

const Feed = () => {
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
      style={styles.container}
      ListHeaderComponent={Stories}
      data={posts}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Post post={item} />}
    />
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
