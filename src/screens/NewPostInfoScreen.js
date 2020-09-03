import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Storage } from "aws-amplify";
import { useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

import { createPost } from "../graphql/mutations";
import { useStateValue } from "../StateProvider";

const NewPostInfoScreen = () => {
  const [{ user }] = useStateValue();
  const [uri, setUri] = useState("");
  const [caption, setCaption] = useState("");
  const route = useRoute();

  const navigation = useNavigation();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    const ImageName = route.params.name;

    Storage.get(ImageName)
      .then((result) => setUri(result))
      .catch((err) => console.log(err));
  };

  const handlePost = async () => {
    const postDetails = {
      caption: caption,
      image: uri,
      userID: user.id,
      likes: 0,
    };

    try {
      const newPost = await API.graphql(
        graphqlOperation(createPost, { input: postDetails })
      );
    } catch (err) {
      console.log("Error creating post: ", err.errors[0].message);
    }

    navigation.navigate("Home");
  };

  if (!uri) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: uri }} />
        <Text style={styles.instruction}>Add post info:</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.captionInstruction}>Caption:</Text>
        <TextInput
          value={caption}
          onChange={(e) => setCaption(e.nativeEvent.text)}
          style={styles.captionInput}
          placeholder={"Enter a caption"}
          placeholderTextColor={"#939393"}
        />
      </View>
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text>POST</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPostInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  infoContainer: {
    flex: 0.6,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  instruction: {
    marginTop: 20,
    textAlign: "center",
    fontFamily: "light",
    fontSize: 20,
  },
  captionInstruction: {
    fontFamily: "light",
    fontSize: 18,
  },
  captionInput: {
    flex: 1,
    borderBottomWidth: 1,
    marginLeft: 20,
    borderBottomColor: "lightgray",
    height: 40,
  },
  postButton: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    width: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
