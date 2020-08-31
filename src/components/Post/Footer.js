import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

const Footer = ({
  username,
  caption,
  likesCount: likesCountProp,
  postedAt,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    setLikesCount(likesCountProp);
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
      <View style={styles.containerIcons}>
        <View style={styles.leftIcons}>
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
      <View style={styles.containerLikes}>
        <Text style={styles.likesCount}>{likesCount}</Text>
        <Text> likes</Text>
      </View>
      <View style={styles.containerName}>
        <Text style={styles.username}>{username}</Text>
        <Text>{caption}</Text>
      </View>
      <Text style={styles.postedAt}>{postedAt}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  containerLikes: {
    flexDirection: "row",
  },
  containerName: {
    flexDirection: "row",
  },
  leftIcons: {
    width: 105,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesCount: {
    fontWeight: "bold",
  },
  postedAt: {
    marginTop: 2,
    fontSize: 12,
    color: "gray",
  },
  username: {
    marginRight: 5,
    fontWeight: "bold",
  },
});
