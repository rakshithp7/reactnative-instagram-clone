import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { useRoute } from "@react-navigation/native";

import Comment from "../components/Comment";
import ProfilePicture from "../components/ProfilePicture";
import { commentsByPost } from "../graphql/queries";
import { createComment } from "../graphql/mutations";
import { useStateValue } from "../StateProvider";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const [{ user }] = useStateValue();

  const route = useRoute();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const commentsData = await API.graphql(
        graphqlOperation(commentsByPost, { postID: route.params.postId })
      );
      setComments(commentsData.data.commentsByPost.items);
    } catch (err) {
      console.log("Error in fetching comments:", err.errors[0].message);
    }
  };

  const handleCommentPost = async () => {
    const data = {
      content: comment,
      postID: route.params.postId,
      userID: user.id,
    };
    try {
      const commentData = await API.graphql(
        graphqlOperation(createComment, { input: data })
      );
      alert("comment posted! Reopen comments to see your comment");
      setComment("");
    } catch (err) {
      console.log("Error in posting comment:", err.errors[0].message);
    }
  };

  if (!comments) {
    return (
      <View style={styles.container}>
        <Text>No comments</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Comment comment={item} />}
      />
      <View style={styles.addComment}>
        <ProfilePicture
          uri="https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/88946651_184331523011449_3927406279730921472_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=w42x-a-yntcAX9Ynvbk&oh=ad9e8b22c4e324012aae8e22edeadf06&oe=5F7743AE"
          size={35}
        />
        <TextInput
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={styles.commentInput}
          placeholder={"Add a comment..."}
          placeholderTextColor={"#939393"}
        />
        <TouchableOpacity onPress={handleCommentPost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addComment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    paddingLeft: 0,
    paddingRight: 10,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
  },
  commentInput: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    height: 45,
    color: "black",
    fontSize: 16,
  },
  postButton: {
    color: "#187ce6",
  },
});
