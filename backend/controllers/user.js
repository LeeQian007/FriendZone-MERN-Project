import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    // get the Id from req
    const { id: sentID } = req.params;

    // find the whole info of the id in db
    const userInfo = await User.findById(sentID);

    // send info back
    res.status(200).json({ userInfo });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserFrinds = async (req, res) => {
  try {
    // get the Id from the req
    const { id } = req.params;
    // console.log(id, "🐽");

    console.log(id);

    // identify the user from db and extract the "friends"
    const user = await User.findById(id);

    // 'await' can only be used with a function that returns a "Promise"
    // const usertest = await User.findById(id).friends;
    // console.log(usertest, "ssssssssss"); // undefined

    // keep in mind that if the asynchronous operations are dependent on each other or require a specific * order *, using Promise.all() with map might not be appropriate, and you may need to consider other strategies for handling the asynchronous operations sequentially.

    // get all friends info
    const friendsInfo = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // format info since we don't need pwd or something
    const formattedfriends = friendsInfo.map(
      ({ firstName, lastName, _id, occupation, location, picturePath }) => ({
        firstName,
        lastName,
        _id,
        occupation,
        location,
        picturePath,
      })
    );

    res.status(200).json(formattedfriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addRemoveFrind = async (req, res) => {
  try {
    // get the object id  and user id
    const { friendId, id } = req.params;

    // get the user's frinds array
    const userInfo = await User.findById(id);

    // verify
    const verify = userInfo.friends.includes(friendId);

    if (!verify) {
      // add the frind
      await User.findByIdAndUpdate(
        id,
        { friends: [...friends, friendId] },
        { new: true }
      );
    } else {
      // delete the friend
      userInfo.friends = userInfo.friends.filter((id) => id !== friendId);
      userInfo.save();
    }

    // format friends
    const friendsInfo = await Promise.all(
      userInfo.friends.map((id) => User.findById(id))
    );

    const formattedfriends = friendsInfo.map(
      ({ firstName, lastName, _id, occupation, location, picturePath }) => ({
        firstName,
        lastName,
        _id,
        occupation,
        location,
        picturePath,
      })
    );

    res.status(200).json(formattedfriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
