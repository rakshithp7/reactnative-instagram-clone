import React from "react";
import { FlatList } from "react-native";

import Stories from "./Stories";
import Post from "./Post/Post";

const posts = [
  {
    id: "1",
    user: {
      imageUri:
        "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/106582968_633995627464499_7264728415554450674_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=vwkf5XaXn3UAX8-QIDM&oh=63d0e61461fc18fcfcf4e0aa4616482b&oe=5F76DF10",
      name: "Ritwik",
    },
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/92324737_1091763994541723_4617489255928145985_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_cat=111&_nc_ohc=ZD_RsXxanLAAX8sCmSC&oh=93e722b260023a2abd5599f5c4a23392&oe=5F761D5C",
    caption: "Bounded with memories",
    likesCount: 1234,
    postedAt: "3 hours ago",
  },
  {
    id: "2",
    user: {
      imageUri:
        "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/103171785_683006512481009_6702587271527958792_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=hNm4tUDGQtwAX9kWpF5&oh=b85ae557908f72bd4ebe71d520215ac4&oe=5F73A90E",
      name: "Pranjal",
    },
    imageUri:
      "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-15/e35/118544258_156828729372864_6315605676354768524_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QPToYnswauQAX-4yNry&oh=9ea6db8bffb156104d3dbaaed5344c98&oe=5F7391E9",
    caption: "Cheers to me for doing whatever the * i want",
    likesCount: 1234,
    postedAt: "2 Days ago",
  },
  {
    id: "3",
    user: {
      imageUri:
        "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/117737860_189345602577970_6336609404481365192_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=ltPslW8AzGIAX8IDaIX&oh=f51ddff9fd143ac493052959ac46e579&oe=5F73C18A",
      name: "Aryaman",
    },
    imageUri:
      "https://scontent-bom1-1.cdninstagram.com/v/t51.2885-15/e35/118258353_415224759452382_6162109352583301155_n.jpg?_nc_ht=scontent-bom1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=OTFBgN27xBwAX9XuzJd&oh=a6c0beff3a5dec6022ae90f56d4dd37b&oe=5F764B39",
    caption: "Hi I'm a good boy",
    likesCount: 1234,
    postedAt: "6 hours ago",
  },
];

const Feed = () => {
  return (
    <FlatList
      ListHeaderComponent={Stories}
      data={posts}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Post post={item} />}
    />
  );
};

export default Feed;
