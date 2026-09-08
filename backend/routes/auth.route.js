import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//email verification routes
router.post("/verify-email",verifyEmail);

export default router;
