import express from "express";
const router = express.Router();
import {
  verifyEmail,
  verifyOtp,
} from "../controller/auth1.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

router.post("/verify", verifyEmail);
router.post("/verify/Otp", verifyToken, verifyOtp)
export default router;
