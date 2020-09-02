import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { useRoute } from "@react-navigation/native";

import { getPost } from "../graphql/queries";
import Post from "../components/Post/Post";

const SinglePost = () => {
  const [post, setPost] = useState(null);

  const route = useRoute();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const id = route.params.postId;
      const postData = await API.graphql(graphqlOperation(getPost, { id }));

      setPost(postData.data.getPost);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      {post ? <Post post={post} /> : <ActivityIndicator />}
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
