import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { verifyToken } from "./middleware/auth.js";

// configuration
// import.meta.url   -->  "file:///Users/liqiang/Desktop/ChatProject/backend/index.js"
// fileURLToPath(import.meta.url)  -->  "/Users/liqiang/Desktop/ChatProject/backend/index.js"
// const __dirname = path.dirname(__filename);   -->  "/Users/liqiang/Desktop/ChatProject/backend"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage
// multer --> for people uploading their files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// routes with files
// here shows why we call "middleware" (between the "route" and "controller" )
// because we need to use upload so we write app.post here, it should be in the routes filefolder
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

// auth routes
app.use("/auth", authRoutes);

// user routes
app.use("/user", userRoutes);

// post routes
app.use("/post", postRoutes);

// mongoose setup
// first will try the port in .env, if it didn't work will try 6001
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Running, Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
