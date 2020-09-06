import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingLeft: 8,
  },
  dotsIcon: {
    marginRight: 5,
  },
  name: {
    flex: 1,
    fontFamily: "medium",
    color: "#101010",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 400,
  },
  footerContainer: {
    padding: 12,
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  footerLeftIcons: {
    width: 105,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLikes: {
    flexDirection: "row",
  },
  likesCount: {
    fontWeight: "bold",
  },
  postedAt: {
    marginTop: 2,
    fontSize: 12,
    color: "gray",
  },
  footerUsername: {
    marginRight: 5,
    fontWeight: "bold",
  },
  comments: {
    color: "gray",
  },
});

export default styles;
