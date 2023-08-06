import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const loggedInUserId = useSelector((state) => state.user._id);
  // likes 我们在PostSchema里面定义的是个obj
  const isLiked = Boolean(likes[loggedInUserId]);
  const [isComments, setIsComments] = useState(false);
  // Object.keys(obj.)  可以返回 由key值 组成的数组
  const likeCount = Object.keys(likes).length;

  const patchLike = () => {};

  return (
    <WidgetWrapper m="1.4rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} fontSize="1.2rem" sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </Typography>
    </WidgetWrapper>
  );
};

export default PostWidget;
