import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyToken.js";
import {
  createUser,
  deleteUser,
  getUser,
 appUser,
  getFriend,
  followingUser,
  unfollowUser,
  updateUser,
} from "../controller/user.controler.js";

router.post("/create", verifyToken, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUser);
router.get("/friends/:userId", getFriend);
router.put("/:id/follow", followingUser);
router.put("/:id/unfollow", unfollowUser);
router.get("/app",appUser)

export default router;
