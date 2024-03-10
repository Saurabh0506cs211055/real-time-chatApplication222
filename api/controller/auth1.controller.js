import express from "express";
import verify from "../model/verfication.model.js";
import Otp from "otp-generator";
import user from "../model/user1.model.js";
import bcrypt from "bcrypt";
import sendemail from "../utils/email.js";
import JWt from "jsonwebtoken";

// verify email

export const verifyEmail = async (req, res, next) => {
  try {
    const genOtp = Otp.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(genOtp);
    const otp = bcrypt.hashSync(genOtp, 6);
    const userVerify = new verify({
      ...req.body,
      otp: otp,
    });
    console.log(req.body.email);
    const email = req.body.email;
    sendemail(email, genOtp);
    await userVerify.save();

    const token = JWt.sign(
      {
        userId: verify._id,
        username: req.body.username,
        email: email,
      },
      process.env.JWT_KEY
    );

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(201)
      .send("otp send successfully");
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
};

// verifying otp

export const verifyOtp = async (req, res, next) => {
  try {
    const userEmail = await verify.findOne({ email: req.email });
    if (!userEmail) return res.status(404).send("something went wrong");
    const correct = bcrypt.compareSync(req.body.otp, userEmail.otp);
    if (!correct) return res.status(404).send("otp is incorrect");

    res.status(201).send("otp verify successfully");
    const password = bcrypt.hashSync(req.body.password , 6);
    const newUser = new user({
      ...req.body,
      email: req.email,
      username: req.username,
      password: password,
    });
    await newUser.save();
    await verify.findOneAndDelete({ email: req.email });
  } catch (error) {
    res.status(404).send(error);
  }
};

// login user

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
