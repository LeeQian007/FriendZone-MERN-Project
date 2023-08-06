import Post from "../models/Post.js";
import User from "../models/User.js";

// create post
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// read post
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

export const likePosts = async (req, res) => {
  try {
    // 被点赞用户的id
    const { id } = req.params;

    // 点赞用户的id
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    // 用户是否已经点赞了
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // 更新被点赞用户的数据
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
