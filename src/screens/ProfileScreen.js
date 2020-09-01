import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";

import { userByUsername } from "../graphql/queries";
import Profile from "../components/Profile/Profile";

const ProfileScreen = () => {
  const [authenticatedUsername, setAuthenticatedUsername] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentUserInfo().then((res) => {
      setAuthenticatedUsername(res.username);
    });

    fetchUserDetails();
  }, [authenticatedUsername]);

  const fetchUserDetails = async () => {
    try {
      const userData = await API.graphql(
        graphqlOperation(userByUsername, { username: authenticatedUsername })
      );

      setUser(userData.data.userByUsername.items[0]);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

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
