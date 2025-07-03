import express from "express";
import { getPlaces, addPlace, getUserSavedPlaces } from "../controllers/placeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all places (public route)
router.get("/", getPlaces);

// Add a place (protected route, user must be logged in)
router.post("/", verifyToken, addPlace);

// Get saved places for the logged-in user (protected route)
router.get("/saved", verifyToken, getUserSavedPlaces);

export default router;
