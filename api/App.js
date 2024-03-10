import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
import cors from "cors"
import VerifyRouter from "./router/auth1.route.js";
import GroupRouter from "./router/group.routes.js"
import UserRouter from "./router/user.router.js";
import PostRouter from "./router/post.router.js";
import ConversationRouter from "./router/conversation.router.js";
import MessageRouter from "./router/message.router.js";
import authRoutes from "./router/auth.routes.js"


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // 


dotenv.config();
mongoose.set("strictQuery", true);
const App = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.Mongodb);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
  }
};


App.use(cors({ origin: "http://localhost:5173", credentials: true }));
App.use("/images", express.static(path.join(__dirname, "public/images")));


App.use(helmet());
App.use(morgan("common"));
App.use(express.json());
App.use(cookiesParser());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
App.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

App.use("/api/auth", authRoutes);
App.use("/api/users", UserRouter);
App.use("/api/conversations", ConversationRouter);
App.use("/api/messages", MessageRouter);
App.use("/api/posts", PostRouter);
App.use("/api/group",GroupRouter)

App.listen(8001, () => {
  connect();
  console.log("app in listening");
});
