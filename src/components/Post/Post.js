import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Moment from "react-moment";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import ProfilePicture from "../ProfilePicture";
import styles from "./styles";

const Post = ({ post }) => {
  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsLiked(true);
    }
  };

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    setLikesCount(post.likes);
  }, []);

  const onLikePressed = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
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
              {isLiked ? (
                <AntDesignIcon name="heart" size={25} color={"#e73838"} />
              ) : (
                <AntDesignIcon name="hearto" size={25} />
              )}
            </TouchableWithoutFeedback>
            <FontistoIcon name="comment" size={22} />
            <SimpleLineIcon name="paper-plane" size={23} />
          </View>
          <FontAwesomeIcon name="bookmark-o" size={25} />
        </View>
        <View style={styles.footerLikes}>
          <Text style={styles.likesCount}>{post.likes}</Text>
          <Text> likes</Text>
        </View>
        <View style={styles.footerCaption}>
          <Text style={styles.footerUsername}>{post.user.name}</Text>
          <Text>{post.caption}</Text>
        </View>
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
