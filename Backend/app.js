import express from "express";
import cors from "cors";
import "dotenv/config";
import connectionDB from "./src/Db/connectDb.js";
import path from "path";
import userRouter from "./src/Routes/userRoutes.js";
import RoleRouter from "./src/Routes/roleRoutes.js";
import courseRouter from "./src/Routes/courseRoutes.js";
import categoryRouter from "./src/Routes/categoryRoutes.js";
import reviewRouter from "./src/Routes/reviewRoutes.js";
import enrollmentRouter from "./src/Routes/enrollmentRoutes.js";
import ratingRouter from "./src/Routes/ratingRoutes.js";
const PORT = process.env.PORT || 5000;

connectionDB();
const app = express();

app.use(express.json());
const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "./public")));

app.use(cors());

// routes
app.use("/api/users", userRouter);
app.use("/api/roles", RoleRouter);
app.use("/api/course-creator", courseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/enroll", enrollmentRouter);
app.listen(PORT, () => {
  console.log(`Server is runing PORT:${PORT}`);
});
