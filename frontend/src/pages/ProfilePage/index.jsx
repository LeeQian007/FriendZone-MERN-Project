import React from "react";
import Navbar from "components/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "wigets/UserWidget";
import FriendListWiget from "wigets/FriendListWiget";
import MyPostWidget from "wigets/MyPostWidget";
import PostsWidget from "wigets/PostsWidget";
import axios from "axios";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.userInfo);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <FriendListWiget userId={userId} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
