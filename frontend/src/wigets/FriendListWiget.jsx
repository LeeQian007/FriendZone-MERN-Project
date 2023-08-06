import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { setFriends } from "state";

import React from "react";
import axios from "axios";

export default function FriendListWiget({ userId }) {
  const dispatch = useDispatch();

  // you can access the theme variables inside youor react components using the "useTheme" hook.
  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // getFriends fucntion using axios edition
  const getFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/friends`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(setFriends({ friends: response.data }));
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(friends);

  // only run once at the beginning
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem" mb="1rem">
        {friends.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
}
