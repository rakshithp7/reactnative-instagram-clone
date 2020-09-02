import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";

import { postByUserId } from "../../graphql/queries";

const ProfilePosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const postsData = await API.graphql(
        graphqlOperation(postByUserId, { userID: userId })
      );

      setPosts(postsData.data.postByUserID.items);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const handlePostPress = (postId) => {
    navigation.navigate("SinglePost", { postId: postId });
  };

  if (posts.length === 0) {
    return (
      <View style={styles.containerNoPosts}>
        <Text style={styles.noPosts}>No posts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.postsHeader}>MY POSTS</Text>
      <View style={styles.postsContainer}>
        {posts?.map((post) => (
          <TouchableWithoutFeedback
            key={post.id}
            onPress={(e) => {
              handlePostPress(post.id);
            }}
          >
            <Image
              style={styles.post}
              key={post.id}
              source={{ uri: post.image }}
            />
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default ProfilePosts;

const styles = StyleSheet.create({
  containerNoPosts: {
    alignItems: "center",
    justifyContent: "center",
    height: 60 + "%",
  },
  noPosts: {
    fontFamily: "light",
    fontSize: 20,
  },
  container: {
    backgroundColor: "white",
  },
  postsHeader: {
    textAlign: "center",
    fontFamily: "light",
    fontSize: 20,
    alignSelf: "center",
    padding: 10,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    // borderBottomWidth: 1,
    // borderBottomColor: "#d9d9d9",
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  post: {
    margin: 2,
    alignItems: "center",
    width: 125,
    height: 125,
    flexGrow: 1,
    maxWidth: 130,
  },
});
