import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connectToDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!123");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
