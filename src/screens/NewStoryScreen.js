import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

import { createStory } from "../graphql/mutations";
import { useStateValue } from "../StateProvider";
import {
  getCameraPermission,
  getCameraRollPermission,
  prepareRatio,
  pickImage,
  clickPhoto,
} from "../cameraUtils";

const NewStoryScreen = () => {
  const [{ user }] = useStateValue();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState(null);
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState("");
  const camRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    const handleGetCameraPermission = async () => {
      const status = await getCameraPermission();
      setHasPermission(status);
    };
    handleGetCameraPermission();
    getCameraRollPermission();
  }, []);

  useEffect(() => {
    uploadImage();
  }, [image]);

  useEffect(() => {
    addStoryToDB();
  }, [uri]);

  const getRatio = async () => {
    const ratio = await prepareRatio(camRef);
    setRatio(ratio);
  };

  const handlePickImage = async () => {
    const res = await pickImage();
    setImage(res);
  };

  const handleClickPhoto = async () => {
    const res = await clickPhoto(camRef);
    setImage(res);
  };

  const uploadImage = async () => {
    try {
      if (image) {
        const response = await fetch(image.uri);
        const blob = await response.blob();

        Storage.put(image.name, blob, {
          contentType: "image/jpg",
        })
          .then((res) => {
            const ImageName = image.name;

            Storage.get(ImageName)
              .then((result) => {
                setUri(result);
              })
              .catch((err) =>
                console.log("Error in getting image uri:", err.message)
              );
          })
          .catch((err) => {
            console.log("Error uploading image: ", err.message);
          });
      }
    } catch (err) {
      console.log("Error in uploading:", err.message);
    }
  };

  const addStoryToDB = async () => {
    if (uri !== "") {
      const storyDetails = {
        image: uri,
        userID: user.id,
      };

      try {
        const newStory = await API.graphql(
          graphqlOperation(createStory, { input: storyDetails })
        );
      } catch (err) {
        console.log("Error creating story: ", err.errors[0].message);
      }

      navigation.navigate("Home");
      Alert.alert(
        "Done",
        "Story uploaded!",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };

  if (!hasPermission || hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No permissions to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Upload a Story!</Text>
        </View>
        <Camera
          ref={camRef}
          style={styles.camera}
          type={type}
          onCameraReady={getRatio}
          ratio={ratio}
        >
          {image ? <ActivityIndicator size="large" /> : null}
        </Camera>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <MaterialCommunityIcon
              name="camera-switch"
              size={40}
              color={"#e3e3e3"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClickPhoto}>
            <MaterialCommunityIcon
              name="circle-outline"
              size={100}
              color={"#e3e3e3"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraRoll} onPress={handlePickImage}>
            <EntypoIcon name="images" size={35} color={"#e3e3e3"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewStoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 0.87,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    marginTop: 20,
    zIndex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontFamily: "light",
  },
  footer: {
    position: "absolute",
    padding: 20,
    bottom: 0,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
