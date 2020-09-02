import React from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";

import Profile from "../components/Profile/Profile";
import { useStateValue } from "../StateProvider";

const ProfileScreen = () => {
  const [{ user }] = useStateValue();

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={styles.loading} />
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
