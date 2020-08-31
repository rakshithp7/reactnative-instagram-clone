import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import storiesData from "../data/StoriesData";

const StoryScreen = () => {
  const [userStories, setUserStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const route = useRoute();
  const userId = route.params.userId;

  useEffect(() => {
    const userStories = storiesData.find(
      (storyData) => storyData.user.id === userId
    );

    setUserStories(userStories);
    setActiveStoryIndex(0);
  }, []);

  const handleNextStory = () => {
    if (activeStoryIndex >= userStories.stories.length - 1) {
      return;
    }
    setActiveStoryIndex(activeStoryIndex + 1);
  };

  const handlePreviousStory = () => {
    if (activeStoryIndex <= 0) {
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

  if (!userStories.stories) {
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
          style={styles.story}
          source={{ uri: activeStory.imageUri }}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  story: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
