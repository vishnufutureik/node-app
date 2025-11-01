import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./user.model"; // 👈 Add this import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://vishnu_db_user:YxYpxcR1CwfC0SkE@test.gnrv9gg.mongodb.net/?appName=test")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 Node + Express + MongoDB Server is Running!");
});

// ✅ Create new user (POST)
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ });
  }
});

// ✅ Get all users (GET)
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb+srv://vishnu_db_user:YxYpxcR1CwfC0SkE@test.gnrv9gg.mongodb.net/?appName=test")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Basic Route
// app.get("/", (req, res) => {
//   res.send("🚀 Node + Express + MongoDB Server is Running!");
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
