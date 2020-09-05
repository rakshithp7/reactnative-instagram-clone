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
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

import { createStory } from "../graphql/mutations";
import { useStateValue } from "../StateProvider";

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
    getCameraPermission();
    getCameraRollPermission();
  }, []);

  useEffect(() => {
    uploadImage();
  }, [image]);

  useEffect(() => {
    addStoryToDB();
  }, [uri]);

  const getCameraPermission = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const getCameraRollPermission = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const prepareRatio = async () => {
    try {
      const DESIRED_RATIO = "16:9";

      if (Platform.OS === "android" && camRef.current) {
        const ratios = await camRef.current.getSupportedRatiosAsync();

        // See if the current device has your desired ratio, otherwise get the maximum supported one
        // Usually the last element of "ratios" is the maximum supported ratio
        const ratio =
          ratios.find((ratio) => ratio === DESIRED_RATIO) ||
          ratios[ratios.length - 1];

        setRatio(ratio);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const clickPhoto = async () => {
    try {
      const options = {
        quality: 0.5,
        base64: false,
        skipProcessing: false,
      };

      if (camRef.current) {
        let photo = await camRef.current.takePictureAsync(options);

        const name = photo.uri.substring(photo.uri.lastIndexOf("/") + 1);

        setImage({
          uri: photo.uri,
          name: `${Date.now()}-${name}`,
        });
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
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
        "Story uploaded! Please restart the app to see the story :)",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });

      if (!result.cancelled) {
        const name = result.uri.substring(result.uri.lastIndexOf("/") + 1);

        setImage({
          uri: result.uri,
          name: `${Date.now()}-${name}`,
        });
      }
    } catch (err) {
      console.log("Error in pickImage:", err.message);
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
          onCameraReady={prepareRatio}
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
          <TouchableOpacity onPress={clickPhoto}>
            <MaterialCommunityIcon
              name="circle-outline"
              size={100}
              color={"#e3e3e3"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraRoll} onPress={pickImage}>
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
