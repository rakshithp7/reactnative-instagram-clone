import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const NewPostScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>NewPostScreen</Text>
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
