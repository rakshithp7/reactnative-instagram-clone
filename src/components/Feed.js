import React, { useState, useEffect, useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
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

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();

    wait(2000).then(() => setRefreshing(false));
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
