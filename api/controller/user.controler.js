import express from "express";
import user from "../model/user1.model.js";
import bcrypt from "bcrypt";

// create user information
export const createUser = async (req, res) => {
  try {
    const Email = req.email;
    const User = user.findOne({ email: req.email });
    const newUser = await User.findOneAndUpdate({
      username: req.username,
      email: req.email,
      password: user.password,
      ...req.body,
    });

    await newUser.save();

    res.status(201).send("user is create successfully");
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
};
// update user data

export const updateUser = async (req, res, next) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const User = await user.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};
// login

// logout
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(201)
    .send("logout successfully");
};

// delete a user

export const deleteUser = async (req, res) => {
  if (req.userId === req.params.id || req.isAdmin) {
    try {
      await user.findByIdAndDelete(req.params.id);
      res.status(201).send("user is delete successfully");
    } catch (error) {
      return res.status(404).json(error);
    }
  } else {
    return res.status(404).send("some thing went wrong");
  }
};

// get a users
export const getUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    const USER = userId
      ? await user.findById(userId)
      : await user.findOne({ username: username });

    const { password, creatAt, ...other } = USER._doc;
    res.status(201).json(other);
  } catch (error) {
    res.status(403).send("somethings went wrong");
  }
};

// get a friend

export const getFriend = async (req, res, next) => {
  try {
    const USER = await user.findById(req.params.userId);
    const friends = await Promise.all(
      USER.followings.map((friendId) => {
        return user.findById(friendId);
      })
    );
    let FriendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      FriendList.push({ _id, username, profilePicture });
    });
    res.status(201).json(FriendList);
  } catch (error) {
    console.log("start error");
    console.log(error);
    res.status(202).json(error);
  }
};

// follow  a user

export const followingUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    
    try {
      const User = await user.findById(req.params.id);
      const currentuser = await user.findById(req.body.userId);
      if (User.followers.includes(req.body.userId)) {
        res.status(201).json("you already following the user");
      } else {
        await User.updateOne({ $push: { followers: req.body.userId } });
        await currentuser.updateOne({ $push: { followings: req.params.id } });
        res.status(201).json("user have been follow successfully");
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(404).send("you can't follow your self");
  }
};

// unfollow a user
export const unfollowUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const User = await user.findById(req.params.id);
      const currentuser = await user.findById(req.body.userId);
      if (User.followers.includes(req.params.id)) {
        await User.updateOne({ $pull: { followers: req.body.userId } });
        await currentuser.updateOne({ $pull: { followings: req.params.id } });
        res.status(201).send("user unfollow successfull");
      } else {
        res.status(201).send("user is already unfollow");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(201).send("you can't follow yourself");
  }
};

export const appUser = async (req, res, next) => {
  try {
    const USER = await user.find({});
   
    const User = await Promise.all(
      USER.map((userID) => {
        return user.findOne(userID);
      })
    );

    let UserList = [];
    User.map((friend) => {
      const { _id, username, profilePicture } = friend;

      UserList.push({ _id, username, profilePicture });
    });
    res.status(201).json(UserList);
  } catch (error) {
    console.log(error);
  }
};

// get a particular users byid
//export const getParticular = async(req,res,next)=>{
//  try{
//    const USER = await user.findById(req.params.userId);
//    res.send
//  }
//}