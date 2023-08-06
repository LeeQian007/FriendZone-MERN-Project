import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
    email: {
      type: String,
      required: true,

      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  // 记录创建 的时间
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
