import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

import Stories from "./Stories";
import Post from "./Post/Post";
import { listPosts } from "../graphql/queries";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setRefreshing(true);

    try {
      const postsData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postsData.data.listPosts.items);
    } catch (err) {
      console.log(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={Stories}
      data={posts}
      refreshing={refreshing}
      onRefresh={fetchPosts}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Post post={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
