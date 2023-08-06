import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    likes: {
      // "Map" here means "obj.", don't use array here because the effiency
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
