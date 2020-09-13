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
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  getCameraPermission,
  getCameraRollPermission,
  prepareRatio,
  pickImage,
  clickPhoto,
} from "../cameraUtils";

const NewPostScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState(null);
  const [image, setImage] = useState(null);
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
    if (image) {
      goToPostInfoScreen();
    }
  }, [image]);

  const getRatio = async () => {
    const ratio = await prepareRatio(camRef);
    setRatio(ratio);
  };

  const handlePickImage = async () => {
    const res = await pickImage(3, 4);
    setImage(res);
  };

  const handleClickPhoto = async () => {
    const res = await clickPhoto(camRef);
    setImage(res);
  };

  const goToPostInfoScreen = async () => {
    navigation.navigate("NewPostInfo", { image: image });
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
        onCameraReady={getRatio}
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
          onPress={handlePickImage}
        />
      </Camera>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleClickPhoto}>
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
