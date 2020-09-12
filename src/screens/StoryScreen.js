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
import Moment from "react-moment";
import { useRoute } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Entypo";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import ProfilePicture from "../components/ProfilePicture";
import { listUsersWithStories } from "../graphql/queries";

const StoryScreen = () => {
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeUserIndex, setActiveUserIndex] = useState(null);

  const route = useRoute();

  useEffect(() => {
    fetchUsersWithStories();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setStories(users[activeUserIndex].stories.items);
      setActiveStoryIndex(0);
    }
  }, [activeUserIndex]);

  const fetchUsersWithStories = async () => {
    try {
      const userId = route.params.userId;
      const userData = await API.graphql(
        graphqlOperation(listUsersWithStories)
      );
      const usersWithStories = userData.data.listUsers.items.filter(
        (x) => x.stories.items.length > 0
      );

      const userClicked = Object.keys(usersWithStories).find(
        (key) => usersWithStories[key].id === userId
      );

      setUsers(usersWithStories);
      setActiveUserIndex(parseInt(userClicked));
      setActiveStoryIndex(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleNextStory = () => {
    if (
      activeStoryIndex >= stories.length - 1 &&
      activeUserIndex >= users.length - 1
    ) {
      return;
    }
    if (activeStoryIndex >= stories.length - 1) {
      setActiveUserIndex(activeUserIndex + 1);
    }
    setActiveStoryIndex(activeStoryIndex + 1);
  };

  const handlePreviousStory = () => {
    if (activeStoryIndex <= 0 && activeUserIndex <= 0) {
      return;
    }
    if (activeStoryIndex <= 0) {
      setActiveUserIndex(activeUserIndex - 1);
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

  if (!users) {
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
          source={{
            uri: activeStory?.image,
          }}
        >
          <View style={styles.storyHeader}>
            <View style={styles.storyInfoContainer}>
              <ProfilePicture uri={users[activeUserIndex]?.image} size={35} />
              <Text style={styles.storyInfoUserName}>
                {users[activeUserIndex]?.name}
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
