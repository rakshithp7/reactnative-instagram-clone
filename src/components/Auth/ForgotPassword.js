import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Auth } from "aws-amplify";

const ForgotPassword = (props) => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSubmitUsername = async () => {
    if (username) {
      Auth.forgotPassword(username)
        .then((data) => {
          setCodeSent(true);
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });
    } else {
      alert("Please enter username");
    }
  };

  const handleChangePassword = async () => {
    if (code && password) {
      Auth.forgotPasswordSubmit(username, code, password)
        .then((data) => {
          alert("Password changed!");
          setCode("");
          setPassword("");
          props.onStateChange("signIn");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Please enter the code and New Password");
    }
  };

  if (props.authState === "forgotPassword") {
    if (codeSent) {
      return (
        <SafeAreaView stlye={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={styles.resetText}>Enter code recieved in E-mail</Text>
          </View>
          <View style={styles.codeContainer}>
            <TextInput
              value={code}
              style={styles.input}
              placeholder={"Enter code"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setCode(e.nativeEvent.text)}
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              style={styles.input}
              placeholder={"New Password"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={(e) => handleChangePassword()}>
              <View style={styles.submit}>
                <Text style={styles.submitText}>SEND</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCode("");
                setPassword("");
                props.onStateChange("signIn");
              }}
            >
              <View style={styles.backText}>
                <Text>Back to Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                setCodeSent(false);
                setCode("");
                setPassword("");
              }}
            >
              <View style={styles.footerText}>
                <Text style={styles.tryAgainText}>Try again</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView stlye={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={styles.resetText}>Reset your password</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Username *</Text>
            <TextInput
              value={username}
              style={styles.input}
              placeholder={"Enter your username"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setUsername(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={(e) => handleSubmitUsername()}>
              <View style={styles.submit}>
                <Text style={styles.submitText}>SEND</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onStateChange("signIn")}>
              <View style={styles.backText}>
                <Text>Back to Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  } else {
    return <></>;
  }
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  codeContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    marginBottom: 170,
  },
  imageContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resetText: {
    fontSize: 25,
  },
  infoContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 170,
    width: Dimensions.get("window").width - 100,
  },
  username: {
    paddingLeft: 13,
    alignSelf: "flex-start",
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
  submit: {
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
  submitText: {
    color: "white",
    fontSize: 18,
  },
  backText: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width - 100,
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
  tryAgainText: {
    fontWeight: "bold",
  },
});
