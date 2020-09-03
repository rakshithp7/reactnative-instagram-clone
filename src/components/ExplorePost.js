import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExplorePost = ({ post }) => {
  const navigation = useNavigation();

  const handleExplorePress = (postId) => {
    navigation.navigate("SinglePost", { postId: postId });
  };

  return (
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
  );
};

export default ExplorePost;

const styles = StyleSheet.create({
  explorePost: {
    margin: 3,
    flexGrow: 1,
    alignItems: "center",
    width: 150,
    height: 150,
  },
});
