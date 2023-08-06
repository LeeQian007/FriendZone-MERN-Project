import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import Navbar from "components/Navbar";
import { Box } from "@mui/material";
import UserWidget from "wigets/UserWidget";
import MyPostWidget from "wigets/MyPostWidget";
import PostsWidget from "wigets/PostsWidget";
import AdvertWidget from "wigets/AdvertWidget";
import FriendListWiget from "wigets/FriendListWiget";

export default function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
          <MyPostWidget />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWiget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
