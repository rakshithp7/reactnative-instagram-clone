import React from "react";
import { StyleSheet, TextInput, SafeAreaView, View } from "react-native";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import Explore from "../components/Explore";

const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <EvilIcon
          style={styles.searchIcon}
          name="search"
          size={35}
          color={"black"}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={"Search"}
          placeholderTextColor={"#939393"}
        />
        <AntDesignIcon
          style={styles.scanIcon}
          name="scan1"
          size={25}
          color={"black"}
        />
      </View>
      <Explore />
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: "black",
    paddingLeft: 15,
    fontSize: 16,
  },
  scanIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
