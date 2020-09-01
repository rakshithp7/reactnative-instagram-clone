import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>NotificationScreen</Text>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
