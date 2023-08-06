import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
//    auth/register  is being put on the index.js since we need multer to upload our picture.

export default router;
