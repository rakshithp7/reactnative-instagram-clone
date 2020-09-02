import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from "react-native";
import { Auth } from "aws-amplify";

import Profile from "../components/Profile/Profile";
import { useStateValue } from "../StateProvider";

const ProfileScreen = () => {
  const [{ user }] = useStateValue();

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={styles.loading} />
        <Button title="LOGOUT" onPress={logout} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Profile user={user} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    alignSelf: "center",
  },
});
