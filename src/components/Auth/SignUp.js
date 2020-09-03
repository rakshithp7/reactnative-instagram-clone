import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { Auth } from "aws-amplify";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    try {
      if (username && password && email) {
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: { email },
        });

        props.onStateChange("confirmSignUp", { username, name });
      } else {
        alert("Please fill in all the fields");
      }
    } catch (error) {
      console.log("error signing up:", error.message);
      alert(error.message);
    }
  };

  if (props.authState === "signUp") {
    return (
      <SafeAreaView stlye={styles.container}>
        <View style={styles.imageContainer}>
          <AntDesignIcon name="adduser" style={styles.userIcon} size={120} />
        </View>

        <View style={styles.infoContainer}>
          <KeyboardAwareScrollView>
            <TextInput
              value={name}
              style={styles.input}
              placeholder={"Name"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
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
            <TextInput
              value={email}
              style={styles.input}
              placeholder={"Email"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />

            <TouchableOpacity onPress={(e) => handleSignup()}>
              <View style={styles.login}>
                <Text style={styles.loginText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => props.onStateChange("signIn")}>
            <View style={styles.footerText}>
              <Text>Already have an account? </Text>
              <Text style={styles.signIn}>Sign In.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userIcon: {
    color: "#343434",
    alignSelf: "flex-end",
  },
  infoContainer: {
    flex: 0.7,
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
  signIn: {
    fontWeight: "bold",
  },
});
