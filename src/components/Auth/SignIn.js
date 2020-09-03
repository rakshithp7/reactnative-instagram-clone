import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Auth } from "aws-amplify";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      if (username && password) {
        const user = await Auth.signIn(username, password);
      } else {
        alert("Please fill in all the fields");
      }
    } catch (error) {
      console.log("error signing in", error.message);
      alert(error.message);
    }
  };

  if (props.authState === "signIn") {
    return (
      <SafeAreaView stlye={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/instagram-text.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.clone}>Clone</Text>
        <View style={styles.infoContainer}>
          <TextInput
            value={username}
            style={styles.input}
            placeholder={"Username"}
            placeholderTextColor={"#939393"}
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.input}
            placeholder={"Password"}
            placeholderTextColor={"#939393"}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={(e) => login()}>
            <View style={styles.login}>
              <Text style={styles.loginText}>Log in</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.onStateChange("forgotPassword")}
          >
            <Text>Forgot password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => props.onStateChange("signUp")}>
            <View style={styles.footerText}>
              <Text>Don't have an account? </Text>
              <Text style={styles.signup}>Sign up.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
  clone: {
    marginTop: -70,
    marginBottom: -50,
    fontSize: 30,
    alignSelf: "center",
  },
  infoContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    marginLeft: 20,
    width: 280,
    borderRadius: 5,
    borderColor: "lightgray",
    textAlign: "center",
    height: 60,
  },
  login: {
    margin: 10,
    borderWidth: 1,
    marginLeft: 20,
    width: 280,
    borderRadius: 5,
    height: 60,
    backgroundColor: "#187ce6",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "white",
    fontSize: 18,
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    maxHeight: 40,
    borderTopColor: "#d4d4d4",
  },
  footerText: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  signup: {
    fontWeight: "bold",
  },
});
