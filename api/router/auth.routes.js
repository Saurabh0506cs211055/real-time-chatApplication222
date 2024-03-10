import express from "express";
import { login,createUser,logout } from "../controller/auth.controller.js";
const router = express.Router();
router.post("/create",createUser);
router.post("/login",login),
router.post("/logout/:id",logout)


export default router