import React, { useEffect } from "react";
import PostWidget from "./PostWidget";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import axios from "axios";

export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/post", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setPosts({ posts: response.data }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserPosts = async () => {
    const response = await axios.get(
      `http://localhost:3001/post/${userId}/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setPosts({ posts: response.data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
}
