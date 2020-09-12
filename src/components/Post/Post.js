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
import { updatePost } from "../../graphql/mutations";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const navigation = useNavigation();

  useEffect(() => {
    setLikesCount(post.likes);
  }, []);

  useEffect(() => {
    updateLikes();
  }, [likesCount]);

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLikePressed();
    }
  };

  const onLikePressed = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
  };

  const updateLikes = async () => {
    if (post.id) {
      const data = {
        id: post.id,
        likes: likesCount,
      };
      try {
        const updateLikesCount = await API.graphql(
          graphqlOperation(updatePost, { input: data })
        );
      } catch (err) {
        console.log("Error in updating likes:", err.errors[0].message);
      }
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
