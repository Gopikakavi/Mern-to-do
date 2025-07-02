import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
mongoose.set("strictQuery", true);

// Middlewares
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// DB config
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("MongoDB connection error:", err);
    } else {
      console.log("✅ MongoDB connected");
    }
  }
);

// Start server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
