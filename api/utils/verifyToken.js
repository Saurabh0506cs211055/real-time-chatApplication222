import express from "express";
import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(404).send("your email is not present");
  Jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
    if (error) return res.status(404).send("some things went wrong");
    req.userId = payload.userId;
    req.email = payload.email;
    req.username = payload.username;
    next();
  });
};
