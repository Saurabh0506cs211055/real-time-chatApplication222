import express from "express";
import {
  createConversation,
  getConversation,
  gettwoconversation,
  groupCoversation,
  creatgroupConversation
} from "../controller/conversation.controller.js";


const router = express.Router();

router.post("/:senderId/:reciverId", createConversation);
router.get("/:userId", getConversation);
router.get("/find/:firstuserId/:seconduserId", gettwoconversation);
router.get("/group/:userId/find/:groupId",groupCoversation)
router.post("/:groupId",creatgroupConversation)
export default router;
