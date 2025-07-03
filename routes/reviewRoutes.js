import express from "express";
import { addReview, getReviews, deleteReview } from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Review
router.post("/", authMiddleware, addReview);

//  Get All Reviews (No PlaceName Required)
router.get("/", getReviews);

//  Delete Review
router.delete("/:id", authMiddleware, deleteReview);

export default router;
