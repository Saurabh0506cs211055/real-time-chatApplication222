import express from "express";
import {
    getmessage,
    message1
} from "../controller/message.controller.js";

const router = express.Router();
router.post("/", message1),
router.get("/:conversationId", getmessage);

export default router;

