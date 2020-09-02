import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Storage } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const NewPostScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState(null);
  const [image, setImage] = useState(null);
  const camRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    getCameraPermission();
    getCameraRollPermission();
  }, []);

  useEffect(() => {
    uploadImage();
  }, [image]);

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
            navigation.navigate("NewPostInfo", { name: image.name });
          })
          .catch((err) => {
            console.log("Error uploading image: ", err.message);
          });
      }
    } catch (err) {
      console.log("Error in uploading:", err.message);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Upload a Picture!</Text>
      </View>
      <Camera
        ref={camRef}
        style={styles.camera}
        type={type}
        onCameraReady={prepareRatio}
        ratio={ratio}
      >
        <View style={styles.cameraScreen}>
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
              style={styles.icon}
              size={40}
              color={"#e3e3e3"}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={styles.cameraRoll}
          title="Pick an image from camera roll"
          onPress={pickImage}
        />
      </Camera>
      <View style={styles.footer}>
        <TouchableOpacity onPress={clickPhoto}>
          <MaterialCommunityIcon
            name="circle-outline"
            size={100}
            color={"#e3e3e3"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 50,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "light",
  },
  camera: {
    flex: 0.8,
  },
  cameraScreen: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  touchable: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  cameraRoll: {
    flex: 0.2,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginBottom: 15,
  },
  footer: {
    flex: 0.1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
