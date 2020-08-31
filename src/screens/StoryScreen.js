import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  View,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import storiesData from "../data/StoriesData";
import ProfilePicture from "../components/ProfilePicture";

const StoryScreen = () => {
  const [userStories, setUserStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params.userId;

  useEffect(() => {
    const userStories = storiesData.find(
      (storyData) => storyData.user.id === userId
    );

    setUserStories(userStories);
    setActiveStoryIndex(0);
  }, []);

  const navigateToNextUser = () => {
    navigation.push("Story", { userId: (parseInt(userId) + 1).toString() });
  };

  const navigateToPrevUser = () => {
    navigation.push("Story", { userId: (parseInt(userId) - 1).toString() });
  };

  const handleNextStory = () => {
    if (activeStoryIndex >= userStories.stories.length - 1) {
      navigateToNextUser();
      return;
    }
    setActiveStoryIndex(activeStoryIndex + 1);
  };

  const handlePreviousStory = () => {
    if (activeStoryIndex <= 0) {
      navigateToPrevUser();
      return;
    }
    setActiveStoryIndex(activeStoryIndex - 1);
  };

  const handlePress = (e) => {
    const touchLocation = e.nativeEvent.locationX;
    const screenWidth = Dimensions.get("window").width;
    if (touchLocation < screenWidth / 2) {
      handlePreviousStory();
    } else {
      handleNextStory();
    }
  };

  if (!userStories?.stories) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const activeStory = userStories.stories[activeStoryIndex];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <ImageBackground
          style={styles.storyImage}
          source={{ uri: activeStory.imageUri }}
        >
          <View style={styles.storyHeader}>
            <View style={styles.storyInfoContainer}>
              <ProfilePicture uri={userStories.user.imageUri} size={35} />
              <Text style={styles.storyInfoUserName}>
                {userStories.user.name}
              </Text>
              <Text style={styles.storyInfoPostedTime}>
                {activeStory.postedTime}
              </Text>
            </View>
            <Icon
              style={styles.storyHeaderdotsIcon}
              name="dots-three-vertical"
              size={18}
              color={"#e3e3e3"}
            />
          </View>
          <View style={styles.storyFooter}>
            <TextInput
              style={styles.storyFooterTextInput}
              placeholder={"Send message"}
              placeholderTextColor={"#e3e3e3"}
            />
            <SimpleLineIcon
              style={styles.storyFooterSendButton}
              name="paper-plane"
              size={25}
              color={"#e3e3e3"}
            />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  storyImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  storyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 8,
    paddingLeft: 8,
    marginTop: 5,
  },
  storyInfoContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  storyInfoUserName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  storyInfoPostedTime: {
    marginLeft: 12,
    fontSize: 12,
    color: "#d9d9d9",
  },
  storyHeaderdotsIcon: {
    marginRight: 5,
  },
  storyFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  storyFooterTextInput: {
    width: 300,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 50,
    height: 45,
    color: "white",
    paddingLeft: 15,
    fontSize: 16,
  },
  storyFooterSendButton: {
    marginTop: 10,
  },
});
