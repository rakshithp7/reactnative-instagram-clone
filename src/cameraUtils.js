import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const pickImage = async (a1, a2) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [a1, a2],
      quality: 1,
    });

    if (!result.cancelled) {
      const name = result.uri.substring(result.uri.lastIndexOf("/") + 1);

      return {
        uri: result.uri,
        name: `${Date.now()}-${name}`,
      };
    }
  } catch (err) {
    console.log("Error in pickImage:", err.message);
  }
  return;
};

const clickPhoto = async (camRef) => {
  try {
    const options = {
      quality: 0.5,
      base64: false,
      skipProcessing: false,
    };

    if (camRef.current) {
      let photo = await camRef.current.takePictureAsync(options);

      const name = photo.uri.substring(photo.uri.lastIndexOf("/") + 1);

      return {
        uri: photo.uri,
        name: `${Date.now()}-${name}`,
      };
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
  return;
};

const getCameraPermission = async () => {
  try {
    const { status } = await Camera.requestPermissionsAsync();
    return status === "granted";
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

const prepareRatio = async (camRef) => {
  try {
    const DESIRED_RATIO = "16:9";

    if (Platform.OS === "android" && camRef.current) {
      const ratios = await camRef.current.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find((ratio) => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];

      return ratio;
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
  return;
};

export {
  getCameraPermission,
  getCameraRollPermission,
  prepareRatio,
  clickPhoto,
  pickImage,
};
