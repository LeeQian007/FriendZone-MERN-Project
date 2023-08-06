import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

import axios from "axios";

import {
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";

export default function UserWidget() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // after login in, we only have "token" and "_id" in the store
  const token = useSelector((state) => state.token);
  const { _id, picturePath } = useSelector((state) => state.user);

  // theme color
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // 发请求获取 user 信息
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // state change --> re-render
      setUser(response.data.userInfo);
      // console.log(response.data);
    } catch (error) {}
  };

  // THE number of Times a function component renders
  // changes in the component's
  // 1.state  2.props.  3. context change
  // 4.parent component re-renders  5.force re-render
  // 6.UseEffect or useLayoutEffect Dependencies Change
  useEffect(() => {
    getUser();
  }, []);

  // we will render the following content when "user" has value.
  // This pattern is often used when you want to conditionally render components based on certain conditions.
  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <FlexBetween mb="1rem">
          <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <UserImage image={picturePath} {...getInputProps()} />
                </Box>
              </FlexBetween>
            )}
          </Dropzone>
          <Box pl="1rem">
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${_id}`)}
              sx={{
                "&:hover": {
                  opacity: 0.6,
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* Second Row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography fontSize="1rem" color={medium}>
            {location}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography fontSize="1rem" color={medium}>
            {occupation}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Third row */}
      <Box p="1rem 0">
        <FlexBetween>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Fourth row */}
      <Box>
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}
