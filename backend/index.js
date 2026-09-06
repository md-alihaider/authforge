import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connectToDB.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!123");
});

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
