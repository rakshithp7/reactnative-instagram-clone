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
import { API, graphqlOperation } from "aws-amplify";
import Icon from "react-native-vector-icons/Entypo";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import Moment from "react-moment";
import { useRoute } from "@react-navigation/native";

import ProfilePicture from "../components/ProfilePicture";
import { listStorys } from "../graphql/queries";

const StoryScreen = () => {
  const [stories, setStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const route = useRoute();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const storiesData = await API.graphql(graphqlOperation(listStorys));
      setStories(storiesData.data.listStorys.items);

      const storyClicked = Object.keys(storiesData.data.listStorys.items).find(
        (key) =>
          storiesData.data.listStorys.items[key].user.id === route.params.userId
      );

      setActiveStoryIndex(storyClicked);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleNextStory = () => {
    if (activeStoryIndex >= stories.length - 1) {
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

  if (!stories) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const activeStory = stories[activeStoryIndex];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <ImageBackground
          style={styles.storyImage}
          source={{ uri: activeStory?.image }}
        >
          <View style={styles.storyHeader}>
            <View style={styles.storyInfoContainer}>
              <ProfilePicture uri={activeStory?.user.image} size={35} />
              <Text style={styles.storyInfoUserName}>
                {activeStory?.user.name}
              </Text>
              <Moment element={Text} style={styles.storyInfoPostedTime} fromNow>
                {activeStory?.createdAt}
              </Moment>
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
    color: "#e3e3e3",
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
