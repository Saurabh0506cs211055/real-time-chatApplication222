import express  from "express";
import { createGroup,getGroup,getsingleGroup, groupMember} from "../controller/group.controller.js";
const router = express.Router();
router.post("/:userId",createGroup),
router.get("/:Id",getGroup)
router.get("/:groupId",getsingleGroup)
router.get("/groupmember/:groupID",groupMember)
export default router