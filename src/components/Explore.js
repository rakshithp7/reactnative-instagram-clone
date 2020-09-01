import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

import { listPosts } from "../graphql/queries";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();

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

  const handleExplorePress = (postId) => {
    navigation.navigate("SinglePost", { postId: postId });
  };

  return (
    <View style={styles.exploreContainer}>
      {posts.map((post) => (
        <TouchableWithoutFeedback
          key={post.id}
          onPress={(e) => {
            handleExplorePress(post.id);
          }}
        >
          <Image
            style={styles.explorePost}
            key={post.id}
            source={{ uri: post.image }}
          />
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  exploreContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  explorePost: {
    margin: 3,
    flexGrow: 1,
    alignItems: "center",
    width: 150,
    height: 150,
  },
});
