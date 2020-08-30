import React from "react";
import { View, StyleSheet } from "react-native";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const Post = ({ post }) => {
  return (
    <View style={styles.container}>
      <Header imageUri={post.user.imageUri} name={post.user.name} />
      <Body imageUri={post.imageUri} />
      <Footer
        username={post.user.name}
        caption={post.caption}
        likesCount={post.likesCount}
        postedAt={post.postedAt}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
