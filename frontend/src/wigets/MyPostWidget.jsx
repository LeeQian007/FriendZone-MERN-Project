import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { setPosts } from "state";

export default function MyPostWidget() {
  const dispatch = useDispatch();
  const { picturePath, _id } = useSelector((state) => state.user);

  // !! const {token} = useSelector((state) => state.token)    (wrong!)
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;

  const [isImage, setIsImage] = useState(true);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const response = await axios.post(
        `http://localhost:3001/post`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response);
      const posts = await response.data;
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="what's on your mind"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.6rem 1.2rem",
            ml: "1rem",
            fontSize: "1rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            // only one file can be uploaded at a time
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {/* The two are functions provided by the "Dropzone" library to handle drag and drop events */}
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="0.2rem 0.6rem"
                  width="100%"
                  borderRadius="8px"
                  fontSize="0.9rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <p>{image.name}</p>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {image && (
                  <IconButton
                    sx={{ width: "15%" }}
                    onClick={() => setImage(null)}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.1rem" sx={{ cursor: "pointer" }}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.1rem" sx={{ cursor: "pointer" }}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.1rem" sx={{ cursor: "pointer" }}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}
