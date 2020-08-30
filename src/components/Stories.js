import React from "react";
import { StyleSheet, FlatList } from "react-native";

import Story from "./Story";

const data = [
  {
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/88946651_184331523011449_3927406279730921472_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=w42x-a-yntcAX9Ynvbk&oh=ad9e8b22c4e324012aae8e22edeadf06&oe=5F7743AE",
    name: "Rakshith",
  },
  {
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/106582968_633995627464499_7264728415554450674_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=vwkf5XaXn3UAX8-QIDM&oh=63d0e61461fc18fcfcf4e0aa4616482b&oe=5F76DF10",
    name: "Ritwik",
  },
  {
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/117737860_189345602577970_6336609404481365192_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=ltPslW8AzGIAX8IDaIX&oh=f51ddff9fd143ac493052959ac46e579&oe=5F73C18A",
    name: "Aryaman",
  },
  {
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/70861624_2242457685863894_7765938837020213248_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=sq7JT7wpwDYAX_LzUG9&oh=3da12f8fd56e3561ddd9e4aab237faa0&oe=5F7435BB",
    name: "Vineeth",
  },
  {
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/103171785_683006512481009_6702587271527958792_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=hNm4tUDGQtwAX9kWpF5&oh=b85ae557908f72bd4ebe71d520215ac4&oe=5F73A90E",
    name: "Pranjal",
  },
];

const Stories = () => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => (
        <Story imageUri={item.imageUri} name={item.name} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
});
