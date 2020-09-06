import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import Moment from "react-moment";

import ProfilePicture from "./ProfilePicture";
import { getUserForComment } from "../graphql/queries";

const Comment = ({ comment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    if (comment) {
      try {
        const userData = await API.graphql(
          graphqlOperation(getUserForComment, { id: comment.userID })
        );
        setUser(userData.data.getUser);
      } catch (err) {
        console.log("Error getting user details:", err.errors[0].message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <ProfilePicture uri={user?.image} size={40} />
      </View>
      <View style={styles.content}>
        <View style={styles.comment}>
          <Text>
            <Text style={styles.name}>{user?.username} </Text>
            {comment.content}
          </Text>
        </View>
        <View style={styles.footer}>
          <Moment
            element={Text}
            style={styles.postedAt}
            date={comment.createdAt}
            fromNow
          />
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  content: {
    padding: 5,
  },
  comment: {
    marginRight: 60,
  },
  name: {
    fontWeight: "bold",
  },
  postedAt: {
    marginTop: 2,
    fontSize: 12,
    color: "#484848",
  },
});
