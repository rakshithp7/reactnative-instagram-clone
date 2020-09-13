import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { API, graphqlOperation, Storage } from "aws-amplify";

import EvilIcon from "react-native-vector-icons/EvilIcons";

import { updateUser } from "../../graphql/mutations";
import { getCameraRollPermission, pickImage } from "../../cameraUtils";
import { useStateValue } from "../../StateProvider";

const ProfileInfo = ({ name, imageUri }) => {
  const [{ user }] = useStateValue();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      handleChangeProfilePic();
    }
  }, [image]);

  const handlePickImage = async () => {
    await getCameraRollPermission();
    const res = await pickImage(1, 1);
    setImage(res);
  };

  const uploadImageToS3 = async () => {
    try {
      if (image) {
        const response = await fetch(image.uri);
        const blob = await response.blob();

        await Storage.put(image.name, blob, {
          contentType: "image/jpg",
        });
      }
    } catch (err) {
      console.log("Error in uploading:", err.message);
    }
  };

  const getImageUriFromS3 = async () => {
    try {
      const res = await Storage.get(image.name);
      return res;
    } catch (err) {
      console.log("Error in getting image from S3:", err.message);
    }
  };

  const handleChangeProfilePic = async () => {
    try {
      await uploadImageToS3();
      const uri = await getImageUriFromS3();

      const userDetails = {
        id: user.id,
        image: uri,
      };

      await API.graphql(graphqlOperation(updateUser, { input: userDetails }));

      Alert.alert(
        "Done",
        "Profile picture changed! Please restart app to see changes.",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log("Error in updating profile picture:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePickImage}>
        {imageUri === "" ? (
          <EvilIcon name="user" style={styles.profileIcon} size={120} />
        ) : (
          <Image
            style={styles.profileImage}
            source={{ uri: imageUri }}
            resizeMode="contain"
          />
        )}
      </TouchableWithoutFeedback>

      <Text style={styles.name}>Welcome {name}!</Text>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  profileIcon: {
    color: "#343434",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 18,
    fontFamily: "medium",
  },
});
