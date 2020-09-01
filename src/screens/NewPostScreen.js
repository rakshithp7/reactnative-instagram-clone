import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const NewPostScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState(null);
  const camRef = useRef(null);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const prepareRatio = async () => {
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
  };

  const clickPhoto = async () => {
    if (camRef.current) {
      let photo = await camRef.current.takePictureAsync();

      console.log(photo);
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
