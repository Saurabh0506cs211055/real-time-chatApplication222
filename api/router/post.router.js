import express from "express";
import {
  getAllPost,
  getPost,
  getTimelinePost,
  addPost,
  updatePost,
  deletePost,
  LikeDislikePost,
  allAppPost,
 
} from "../controller/post.controller.js";

const router = express.Router();

router.post("/", addPost);
router.put("/:id", updatePost);
router.put("/:id/like", LikeDislikePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);
router.get("/timeline/:userId", getTimelinePost);
router.get("/profile/:username", getAllPost);
router.get("/:userId/post", allAppPost);

export default router;
