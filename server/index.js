import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

const commentSchema = new mongoose.Schema({
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// Routes
app.get("/comments", async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.json(comments);
});

app.post("/comments", async (req, res) => {
  const { name, comment } = req.body;

  const newComment = new Comment({ name: name, text: comment });
  await newComment.save();
  res.json(newComment);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
