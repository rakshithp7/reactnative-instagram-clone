import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Moment from "react-moment";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import ProfilePicture from "../ProfilePicture";
import styles from "./styles";
import { useStateValue } from "../../StateProvider";
import { createLike, deleteLike } from "../../graphql/mutations";

const Post = ({ post }) => {
  const [{ user }] = useStateValue();
  const [myLike, setMyLike] = useState(null);
  const [likesCount, setLikesCount] = useState(post.likes.items.length);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const searchedLike = post.likes.items.find(
        (like) => like.userID === user.id
      );
      setMyLike(searchedLike);
    }
  }, [user]);

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLikePressed();
    }
  };

  const submitLike = async () => {
    const like = {
      userID: user.id,
      postID: post.id,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createLike, { input: like })
      );
      setMyLike(res.data.createLike);
      setLikesCount(likesCount + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const removeLike = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteLike, { input: { id: myLike.id } })
      );
      setLikesCount(likesCount - 1);
      setMyLike(null);
    } catch (e) {
      console.log(e);
    }
  };

  const onLikePressed = async () => {
    if (!user) {
      return;
    }

    if (!myLike) {
      await submitLike();
    } else {
      await removeLike();
    }
  };

  const handleCommentsScreen = () => {
    navigation.navigate("Comments", { postId: post.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProfilePicture uri={post.user.image} size={35} />
        <Text style={styles.name}>{post.user.name}</Text>
        <EntypoIcon
          style={styles.dotsIcon}
          name="dots-three-vertical"
          size={18}
        />
      </View>
      <TapGestureHandler
        onHandlerStateChange={(e) => onDoubleTap(e)}
        numberOfTaps={2}
      >
        <Image style={styles.image} source={{ uri: post.image }} />
      </TapGestureHandler>
      <View style={styles.footerContainer}>
        <View style={styles.footerIcons}>
          <View style={styles.footerLeftIcons}>
            <TouchableWithoutFeedback onPress={onLikePressed}>
              <AntDesignIcon
                name={!myLike ? "hearto" : "heart"}
                size={25}
                color={!myLike ? "black" : "#e73838"}
              />
            </TouchableWithoutFeedback>
            <FontistoIcon name="comment" size={22} />
            <SimpleLineIcon name="paper-plane" size={23} />
          </View>
          <FontAwesomeIcon name="bookmark-o" size={25} />
        </View>
        <View style={styles.footerLikes}>
          <Text style={styles.likesCount}>{likesCount}</Text>
          <Text> likes</Text>
        </View>
        <View>
          <Text>
            <Text style={styles.footerUsername}>{post.user.username} </Text>
            {post.caption}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={handleCommentsScreen}>
          <Text style={styles.comments}>
            View {post.comments.items.length} comments
          </Text>
        </TouchableWithoutFeedback>
        <Moment
          element={Text}
          style={styles.postedAt}
          date={post.createdAt}
          fromNow
        />
      </View>
    </View>
  );
};

export default Post;
