import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authControllers.js";
import { validateSignup, validateLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", validateSignup, registerUser);

// Login user
router.post("/login", validateLogin, loginUser);

// Logout user
router.get("/logout", logoutUser);

export default router;
