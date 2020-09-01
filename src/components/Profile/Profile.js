import React from "react";
import { View } from "react-native";

import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";

const Profile = ({ user }) => {
  return (
    <View>
      <ProfileHeader username={user.username} />
      <ProfileInfo name={user.name} imageUri={user.image} />
      <ProfilePosts userId={user.id} />
    </View>
  );
};

export default Profile;
