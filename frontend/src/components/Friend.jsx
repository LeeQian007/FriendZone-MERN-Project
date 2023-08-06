import React from "react";
import FlexBetween from "./FlexBetween";
import { IconButton, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // got values from the store
  // const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user);

  // wrong. posts --> list
  // const { userPicturePath, location, userId } = useSelector(
  //   (state) => state.posts
  // );

  // console.log(useSelector((state) => state.user));

  // 判断是不是朋友, left: sync with store; right: permanent after the first render.
  const isFriend = friends.find((friend) => friend._id === friendId);

  // 主题色
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  console.log(friendId);
  console.log(_id);

  return (
    <FlexBetween>
      <FlexBetween>
        <UserImage image={userPicturePath} size="55px" />
        <Box onClick={() => {}} ml="0.6rem">
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="1rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {friendId === _id ? null : (
        <IconButton
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // the number is about history -- forward or back
            navigate(0);
          }}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
